/* =========================================================
   MI TURNO — CONEXIÓN SUPABASE
   ========================================================= */

const SUPABASE_URL = "https://osjtjttbflfinexxsqjb.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "BC9ud1dTpYeTq0qKIXHO4iRiDW6xKiN6w62aGUAI-781m2fSB_1QtO0oerpFeDX0rVL3UpcrSIvcSe5z8jo9hWE";


const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);