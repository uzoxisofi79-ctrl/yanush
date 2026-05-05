import { Accentuation, ContextModule } from './types';
import accentuationsData from './data/accentuations';
import modulesData from './data/context_modules';

// --- COMMERCIAL CONFIG ---
export const COMMERCIAL_CONFIG = {
  PRICE_RUB: 990,
  SUBSCRIPTION_DAYS: 30,
  SUPPORT_EMAIL: 'support@janus-trainer.ai',
  PAYMENT_PROVIDER_URL: 'https://checkout.your-payment-gateway.com'
};

// --- DATA FROM FILES ---
export const DEFAULT_ACCENTUATIONS: Accentuation[] = accentuationsData as Accentuation[];

export const DEFAULT_CONTEXT_MODULES: ContextModule[] = modulesData as unknown as ContextModule[];
