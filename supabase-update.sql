-- Run this ONCE in Supabase -> SQL Editor (adds Bangla fields)
alter table public.labs add column if not exists title_bn text default '';
alter table public.labs add column if not exists description_bn text default '';
alter table public.certificates add column if not exists title_bn text default '';
alter table public.certificates add column if not exists org_bn text default '';
update public.certificates set title_bn='CBT&A মেথডলজি, লেভেল ৪', org_bn='পেন্সিলবক্স ট্রেনিং অ্যান্ড ডেভেলপমেন্ট, ঢাকা' where title like 'CBT&A%';
update public.certificates set title_bn='আইটি সাপোর্ট লেভেল ৩ (NSDA)', org_bn='স্কিল গুরু, বগুড়া' where title like 'IT Support Level 3%';
update public.certificates set title_bn='অ্যাডভান্স ডিজিটাল মার্কেটিং, L1 ও L2', org_bn='ফিউচার আইটি, ঢাকা' where title like 'Advance Digital%';
update public.certificates set title_bn='প্রফেশনাল স্পোকেন ইংলিশ', org_bn='সাইফুরস, বগুড়া' where title like 'Professional Spoken%';
update public.certificates set title_bn='এমএস অফিস অ্যাপ্লিকেশন (NSDA / BTEB)', org_bn='সাইবারটেক, বগুড়া' where title like 'MS Office%';
