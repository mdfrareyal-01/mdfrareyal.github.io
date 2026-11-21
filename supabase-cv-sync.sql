-- Run ONCE in Supabase -> SQL Editor (syncs certificates with the CV). Safe to run after the other two files.
update public.certificates set org='PencilBox Training & Assessor Development, Dhaka',
  org_bn='পেন্সিলবক্স ট্রেনিং অ্যান্ড অ্যাসেসর ডেভেলপমেন্ট, ঢাকা' where title like 'CBT&A%';
insert into public.certificates (title, org, issued, title_bn, org_bn) values
('CS101: Introduction to Programming I','Saylor Academy (Online)','Nov 2026','CS101: প্রোগ্রামিং পরিচিতি ১','সাইলর একাডেমি (অনলাইন)'),
('CS102: Introduction to Programming II','Saylor Academy (Online)','Nov 2026','CS102: প্রোগ্রামিং পরিচিতি ২','সাইলর একাডেমি (অনলাইন)'),
('CS105: Introduction to Python','Saylor Academy (Online)','Nov 2026','CS105: পাইথন পরিচিতি','সাইলর একাডেমি (অনলাইন)'),
('CS107: C++ Programming','Saylor Academy (Online)','Nov 2026','CS107: C++ প্রোগ্রামিং','সাইলর একাডেমি (অনলাইন)');
