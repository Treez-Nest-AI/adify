import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ttffvyxdgjszcwiauiua.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0ZmZ2eXhkZ2pzemN3aWF1aXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNzYwNzMsImV4cCI6MjA2OTk1MjA3M30.szjBeVG7t0losA_CvDSgQSEx0fOtrSxbWMlWdvGIuYo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);