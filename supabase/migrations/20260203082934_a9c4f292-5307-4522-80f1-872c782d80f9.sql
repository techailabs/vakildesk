-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'lawyer_owner', 'lawyer_team', 'client');

-- Create plan_type enum
CREATE TYPE public.plan_type AS ENUM ('solo', 'firm');

-- Create plan_status enum
CREATE TYPE public.plan_status AS ENUM ('active', 'past_due', 'cancelled', 'trialing');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles per security requirements)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create firms table
CREATE TABLE public.firms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type plan_type NOT NULL DEFAULT 'solo',
  plan_status plan_status NOT NULL DEFAULT 'trialing',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create firm_members table
CREATE TABLE public.firm_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id UUID NOT NULL REFERENCES public.firms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'active')),
  invited_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(firm_id, user_id)
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id UUID NOT NULL REFERENCES public.firms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create cases table
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id UUID NOT NULL REFERENCES public.firms(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  case_number TEXT,
  case_title TEXT NOT NULL,
  case_type TEXT,
  court TEXT,
  courtroom TEXT,
  judge TEXT,
  next_hearing_date DATE,
  stage TEXT DEFAULT 'Filing',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create case_assignments table (firm only)
CREATE TABLE public.case_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  assigned_to UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES auth.users(id),
  hearing_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(case_id, assigned_to)
);

-- Create case_comments table (firm only, internal)
CREATE TABLE public.case_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  document_type TEXT DEFAULT 'misc' CHECK (document_type IN ('order', 'affidavit', 'pleading', 'evidence', 'misc')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id UUID NOT NULL REFERENCES public.firms(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan plan_type NOT NULL DEFAULT 'solo',
  status plan_status NOT NULL DEFAULT 'trialing',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.firm_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper function: Get user's firm ID
CREATE OR REPLACE FUNCTION public.get_user_firm_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT firm_id FROM public.firm_members
  WHERE user_id = _user_id AND status = 'active'
  LIMIT 1
$$;

-- Helper function: Check if user is firm member
CREATE OR REPLACE FUNCTION public.is_firm_member(_user_id UUID, _firm_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.firm_members
    WHERE user_id = _user_id AND firm_id = _firm_id AND status = 'active'
  ) OR EXISTS (
    SELECT 1 FROM public.firms
    WHERE id = _firm_id AND owner_id = _user_id
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for firms
CREATE POLICY "Firm members can view firm" ON public.firms FOR SELECT USING (public.is_firm_member(auth.uid(), id) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners can update firm" ON public.firms FOR UPDATE USING (owner_id = auth.uid());
CREATE POLICY "Users can create firm" ON public.firms FOR INSERT WITH CHECK (owner_id = auth.uid());

-- RLS Policies for firm_members
CREATE POLICY "Firm members can view members" ON public.firm_members FOR SELECT USING (public.is_firm_member(auth.uid(), firm_id) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners can manage members" ON public.firm_members FOR INSERT WITH CHECK (invited_by = auth.uid());
CREATE POLICY "Owners can update members" ON public.firm_members FOR UPDATE USING (public.is_firm_member(auth.uid(), firm_id));

-- RLS Policies for cases
CREATE POLICY "Firm members can view cases" ON public.cases FOR SELECT USING (public.is_firm_member(auth.uid(), firm_id) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Firm members can create cases" ON public.cases FOR INSERT WITH CHECK (public.is_firm_member(auth.uid(), firm_id));
CREATE POLICY "Firm members can update cases" ON public.cases FOR UPDATE USING (public.is_firm_member(auth.uid(), firm_id));

-- RLS Policies for clients
CREATE POLICY "Firm members can view clients" ON public.clients FOR SELECT USING (public.is_firm_member(auth.uid(), firm_id) OR user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Firm members can create clients" ON public.clients FOR INSERT WITH CHECK (public.is_firm_member(auth.uid(), firm_id));
CREATE POLICY "Firm members can update clients" ON public.clients FOR UPDATE USING (public.is_firm_member(auth.uid(), firm_id));

-- RLS Policies for documents
CREATE POLICY "Firm members can view documents" ON public.documents FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id))
  OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Firm members can upload documents" ON public.documents FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id))
);

-- RLS Policies for case_comments
CREATE POLICY "Firm members can view comments" ON public.case_comments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id))
);
CREATE POLICY "Firm members can add comments" ON public.case_comments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id))
);

-- RLS Policies for case_assignments
CREATE POLICY "Firm members can view assignments" ON public.case_assignments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id))
);
CREATE POLICY "Firm members can create assignments" ON public.case_assignments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND public.is_firm_member(auth.uid(), c.firm_id))
);

-- RLS Policies for subscriptions
CREATE POLICY "Owners can view subscription" ON public.subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.firms f WHERE f.id = firm_id AND f.owner_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'phone'
  );
  
  -- Default role is lawyer_owner for new signups
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'lawyer_owner');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_firms_updated_at BEFORE UPDATE ON public.firms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON public.cases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();