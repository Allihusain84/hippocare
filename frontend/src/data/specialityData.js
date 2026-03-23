/* ──────────────────────────────────────────────
   Speciality Data – used by SpecialityPage
   ────────────────────────────────────────────── */

export const specialities = [
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    ],
    content: [
      "The Department of Physiotherapy at Hippocare Hospital is a cornerstone of our rehabilitative care services. We provide evidence-based physiotherapy treatments designed to restore mobility, reduce pain, and improve the overall quality of life for patients recovering from injuries, surgeries, neurological conditions, and chronic musculoskeletal disorders.",
      "Our team comprises highly qualified physiotherapists and rehabilitation specialists who hold advanced certifications in orthopedic, neurological, cardiopulmonary, and sports physiotherapy. Each therapist brings years of clinical experience and a patient-first approach to every treatment session.",
      "The department is equipped with state-of-the-art rehabilitation equipment including electrotherapy machines, ultrasound therapy units, traction systems, continuous passive motion devices, and a fully functional exercise therapy gymnasium. These resources enable us to deliver personalized rehabilitation programs tailored to each patient's condition and recovery goals.",
      "We offer comprehensive physiotherapy for post-surgical rehabilitation — including joint replacement recovery, spinal surgery aftercare, and fracture mobilization — ensuring patients regain strength and functionality as quickly and safely as possible. Our therapists work closely with orthopedic and neurosurgery teams to design coordinated care plans.",
      "For patients with neurological conditions such as stroke, Parkinson's disease, and spinal cord injuries, we provide specialized neuro-rehabilitation programs that focus on balance training, gait correction, muscle re-education, and functional independence.",
      "Our outpatient physiotherapy clinic serves patients dealing with chronic back pain, cervical spondylosis, frozen shoulder, tennis elbow, and other musculoskeletal ailments. We also run dedicated wellness programs for the elderly, focusing on fall prevention, joint flexibility, and active aging.",
      "At Hippocare, we believe that rehabilitation is not just about treatment — it's about empowering patients to take control of their recovery. Our physiotherapists educate patients on home exercise programs, posture correction, and lifestyle modifications to ensure long-term health benefits and prevent recurrence of injury.",
    ],
    expertDoctors: [
      { id: "dr-anand-sharma-physio", name: "Dr. Anand Sharma", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Sports Physiotherapy", experience: "14+", recommended: "98%", fee: "₹900" },
      { id: "dr-nisha-rawat-physio", name: "Dr. Nisha Rawat", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Neuro Rehabilitation", experience: "11+", recommended: "97%", fee: "₹800" },
      { id: "dr-ravi-malhotra-physio", name: "Dr. Ravi Malhotra", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", specialization: "Orthopedic Physiotherapy", experience: "9+", recommended: "96%", fee: "₹700" },
      { id: "dr-pallavi-joshi-physio", name: "Dr. Pallavi Joshi", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Cardiopulmonary Rehab", experience: "7+", recommended: "95%", fee: "₹600" },
    ],
  },
  {
    slug: "department-of-dentistry",
    name: "Department of Dentistry",
    images: [
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    ],
    content: [
      "The Department of Dentistry at Hippocare Hospital provides comprehensive oral healthcare services ranging from routine dental checkups and cleanings to advanced restorative and cosmetic dental procedures. Our goal is to ensure optimal dental health for every patient in a comfortable, anxiety-free environment.",
      "Our dental team includes experienced oral surgeons, prosthodontists, orthodontists, endodontists, and periodontists who bring specialized expertise across every sub-discipline of modern dentistry. Each practitioner is committed to using the latest techniques and technologies for precision treatment.",
      "The department is outfitted with advanced dental chairs, digital X-ray and OPG imaging systems, rotary endodontic instruments, laser-assisted surgical tools, and porcelain restoration facilities. These enable us to deliver painless, efficient, and long-lasting dental solutions.",
      "We provide a full spectrum of dental services including root canal treatments, dental implants, crowns and bridges, teeth whitening, orthodontic braces, wisdom tooth extractions, and treatment of gum diseases. Pediatric dentistry services are also available to ensure children develop healthy dental habits early.",
      "For patients requiring oral surgery — including impacted tooth removal, jaw cyst excision, and pre-prosthetic surgical procedures — our oral and maxillofacial surgery unit provides safe, in-hospital surgical care with proper anesthesia support and post-operative monitoring.",
      "Preventive dentistry is a key focus area. We conduct regular oral health awareness camps, scaling and polishing sessions, and fluoride application treatments to help patients maintain healthy teeth and gums and avoid costly interventions in the future.",
      "At Hippocare, we understand that visiting a dentist can be stressful for many patients. Our team prioritizes patient comfort through gentle techniques, clear communication, and a warm clinical atmosphere. Emergency dental care is also available for acute toothaches, dental trauma, and infections.",
    ],
    expertDoctors: [
      { id: "dr-rohit-mehra-dent", name: "Dr. Rohit Mehra", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Oral & Maxillofacial Surgery", experience: "15+", recommended: "99%", fee: "₹1000" },
      { id: "dr-shweta-kapoor-dent", name: "Dr. Shweta Kapoor", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Orthodontics", experience: "11+", recommended: "97%", fee: "₹800" },
      { id: "dr-arun-kumar-dent", name: "Dr. Arun Kumar", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", specialization: "Endodontics & Root Canal", experience: "9+", recommended: "96%", fee: "₹700" },
      { id: "dr-divya-singh-dent", name: "Dr. Divya Singh", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Prosthodontics", experience: "8+", recommended: "95%", fee: "₹700" },
    ],
  },
  {
    slug: "diabetes-endocrinology",
    name: "Diabetes & Endocrinology",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    ],
    content: [
      "The Department of Diabetes and Endocrinology at Hippocare Hospital is dedicated to the prevention, diagnosis, and management of diabetes mellitus and hormonal disorders. With diabetes reaching epidemic proportions, our specialized team provides world-class care to help patients lead healthier, more controlled lives.",
      "Our endocrinologists and diabetologists are highly trained physicians with advanced expertise in managing Type 1 diabetes, Type 2 diabetes, gestational diabetes, thyroid disorders, adrenal gland conditions, pituitary gland diseases, metabolic syndrome, and reproductive endocrine disorders including PCOS.",
      "The department operates a dedicated Diabetes Care Center equipped with continuous glucose monitoring (CGM) systems, insulin pump therapy facilities, HbA1c analyzers, and point-of-care testing devices. These tools enable precise monitoring and individualized treatment plans for every patient.",
      "We follow a multidisciplinary approach to diabetes management that includes physician consultations, nutritional counseling by certified dietitians, diabetes education programs, foot care clinics, and retinal screening in collaboration with our ophthalmology department. This holistic model addresses every aspect of the disease.",
      "For patients with thyroid conditions — including hypothyroidism, hyperthyroidism, thyroid nodules, and thyroid cancers — we offer comprehensive evaluation with ultrasound-guided fine needle aspiration, thyroid function panels, and coordinated care with our surgery and oncology teams when required.",
      "Our Diabetes Education Program empowers patients with the knowledge and skills to self-manage their condition effectively. Topics covered include blood glucose self-monitoring, insulin administration techniques, carbohydrate counting, exercise planning, and recognizing signs of hypoglycemia and hyperglycemia.",
      "At Hippocare, we believe that diabetes management goes beyond medication. Our patient-centric approach emphasizes lifestyle modification, regular follow-ups, and emotional support to help patients achieve target glycemic control and reduce the risk of long-term complications such as neuropathy, nephropathy, and cardiovascular disease.",
    ],
    expertDoctors: [
      { id: "dr-sanjay-mittal-endo", name: "Dr. Sanjay Mittal", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Diabetology", experience: "18+", recommended: "99%", fee: "₹1200" },
      { id: "dr-prerna-singh-endo", name: "Dr. Prerna Singh", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Thyroid Disorders", experience: "12+", recommended: "97%", fee: "₹1000" },
      { id: "dr-nikhil-verma-endo", name: "Dr. Nikhil Verma", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", specialization: "Metabolic Diseases", experience: "10+", recommended: "96%", fee: "₹900" },
      { id: "dr-rina-patel-endo", name: "Dr. Rina Patel", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Reproductive Endocrinology", experience: "8+", recommended: "95%", fee: "₹800" },
    ],
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    images: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80",
    ],
    content: [
      "The Department of Obstetrics and Gynaecology at Hippocare Hospital provides holistic women's healthcare services across every stage of life — from adolescence through pregnancy, childbirth, and menopause. Our team of experienced obstetricians, gynecologists, and maternal-fetal medicine specialists delivers compassionate, evidence-based care in a safe and supportive environment.",
      "Our obstetric services cover the full spectrum of maternity care including antenatal checkups, high-risk pregnancy management, normal vaginal deliveries, cesarean sections, and postnatal care. We have well-equipped labour rooms, dedicated operation theatres, and a neonatal intensive care unit (NICU) to handle any delivery-related complication.",
      "For gynecological conditions, we offer expert diagnosis and treatment for menstrual disorders, polycystic ovarian syndrome (PCOS), endometriosis, uterine fibroids, ovarian cysts, pelvic inflammatory disease, and menopausal symptoms. Our minimally invasive surgery unit performs laparoscopic and hysteroscopic procedures for faster recovery.",
      "Fertility assessment and treatment form a key part of our services. We provide couples with thorough reproductive evaluations, ovulation induction, intrauterine insemination (IUI) guidance, and referral support for assisted reproductive technologies. Our fertility counselors provide emotional support throughout the journey.",
      "We conduct regular antenatal classes for expecting mothers covering topics such as nutrition during pregnancy, birthing techniques, breastfeeding guidance, and newborn care. These sessions empower mothers with knowledge and confidence for a positive birth experience.",
      "Cervical cancer screening through Pap smear tests, HPV testing, and colposcopy is routinely offered as part of our preventive gynecology services. We also conduct breast health awareness programs and provide clinical breast examination and referral for mammography.",
      "At Hippocare, our commitment to women's health extends beyond treatment. We create a nurturing, respectful, and private clinical environment where every woman feels heard, cared for, and supported — whether she arrives for a routine checkup or a complex surgical intervention.",
    ],
    expertDoctors: [
      { id: "dr-anjali-mehta-obgyn", name: "Dr. Anjali Mehta", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "High-Risk Pregnancy", experience: "17+", recommended: "99%", fee: "₹1200" },
      { id: "dr-ranjit-chopra-obgyn", name: "Dr. Ranjit Chopra", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Laparoscopic Gynecology", experience: "14+", recommended: "98%", fee: "₹1100" },
      { id: "dr-kriti-bhatia-obgyn", name: "Dr. Kriti Bhatia", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Fertility & IVF", experience: "10+", recommended: "96%", fee: "₹1000" },
      { id: "dr-mansi-aggarwal-obgyn", name: "Dr. Mansi Aggarwal", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Maternal-Fetal Medicine", experience: "8+", recommended: "95%", fee: "₹900" },
    ],
  },
  {
    slug: "nephrology-dialysis",
    name: "Nephrology and Dialysis",
    images: [
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80",
    ],
    content: [
      "The Department of Nephrology and Dialysis at Hippocare Hospital is a specialized unit focused on the prevention, diagnosis, and management of kidney diseases. From early-stage chronic kidney disease to end-stage renal failure, our nephrology team provides comprehensive care backed by the latest medical advancements.",
      "Our nephrologists are experienced in managing a wide range of kidney conditions including acute kidney injury, chronic kidney disease (CKD), glomerulonephritis, nephrotic syndrome, diabetic nephropathy, hypertensive kidney disease, kidney stones, urinary tract infections, and electrolyte disorders. Every patient receives an individualized treatment plan based on thorough evaluation.",
      "The department operates a modern, fully equipped Dialysis Unit that provides both hemodialysis and peritoneal dialysis services. Our unit features advanced dialysis machines with online hemodiafiltration (HDF) capability, ensuring high-quality, efficient treatments that minimize side effects and improve patient comfort.",
      "We maintain the highest standards of infection control and water purification in our dialysis center. Double reverse osmosis (RO) water treatment systems, regular microbiological testing, and stringent sterilization protocols ensure patient safety during every dialysis session.",
      "For patients with end-stage kidney disease, our team provides comprehensive pre-transplant evaluation, donor assessment, and post-transplant follow-up care in coordination with regional transplant centers. We guide patients and families through every step of the transplant journey with clinical expertise and emotional support.",
      "Our nephrology outpatient clinic offers routine kidney function screening, 24-hour urine analysis, renal biopsy guidance, and long-term follow-up for CKD patients. We actively promote early detection of kidney disease through community health camps and awareness programs.",
      "At Hippocare, we recognize that kidney disease affects not just physical health but also the emotional and financial well-being of patients and their families. Our team includes social workers and counselors who assist with insurance guidance, dietary counseling, and psychosocial support to ensure a holistic approach to renal care.",
    ],
    expertDoctors: [
      { id: "dr-rajiv-saxena-nephro", name: "Dr. Rajiv Saxena", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Nephrology & Dialysis", experience: "20+", recommended: "99%", fee: "₹1300" },
      { id: "dr-shikha-jain-nephro", name: "Dr. Shikha Jain", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Renal Transplant Medicine", experience: "14+", recommended: "98%", fee: "₹1100" },
      { id: "dr-anurag-tiwari-nephro", name: "Dr. Anurag Tiwari", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", specialization: "Pediatric Nephrology", experience: "10+", recommended: "96%", fee: "₹900" },
      { id: "dr-pooja-arora-nephro", name: "Dr. Pooja Arora", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Glomerular Diseases", experience: "8+", recommended: "95%", fee: "₹800" },
    ],
  },
  {
    slug: "anaesthesiology",
    name: "Anaesthesiology",
    images: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    ],
    content: [
      "The Department of Anaesthesiology at Hippocare Hospital plays a vital role in ensuring patient safety, comfort, and pain-free experiences across all surgical and interventional procedures. Our anesthesiologists are integral members of the surgical team, providing expert perioperative care from pre-operative assessment through recovery.",
      "Our team consists of highly qualified anaesthesiologists and certified nurse anaesthetists with specialized training in general anaesthesia, regional anaesthesia, neuraxial blocks, ultrasound-guided nerve blocks, and conscious sedation. Each professional brings extensive experience in managing complex cases across all surgical specialties.",
      "The department is equipped with modern anaesthesia workstations featuring advanced ventilators, multi-parameter patient monitors, capnography, bispectral index (BIS) monitoring, and nerve stimulators. These technologies enable our doctors to maintain precise control of anaesthesia depth and ensure patient vital parameters remain stable throughout the procedure.",
      "Pre-anaesthetic evaluation is a cornerstone of our practice. Every surgical patient undergoes a thorough pre-operative assessment where our anaesthesiologists review medical history, assess airway anatomy, optimize pre-existing conditions, and create a customized anaesthesia plan that accounts for the patient's unique risk profile.",
      "Our expertise extends to critical care and pain management. The department manages the surgical ICU, provides emergency airway management, and runs a dedicated Acute Pain Service that offers multimodal analgesia, patient-controlled analgesia (PCA), and epidural pain relief for post-operative patients.",
      "For high-risk patients — including those with cardiac conditions, morbid obesity, difficult airways, and advanced age — our senior anaesthesiologists employ specialized protocols and advanced monitoring to minimize complications and ensure safe outcomes.",
      "At Hippocare, the Department of Anaesthesiology is committed to delivering compassionate, patient-centered care. We believe that every patient deserves a calm, pain-free surgical experience, and our team works tirelessly behind the scenes to make that possible with the highest standards of clinical excellence.",
    ],
    expertDoctors: [
      { id: "dr-arun-bahl-anaes", name: "Dr. Arun Bahl", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Cardiac Anaesthesia", experience: "22+", recommended: "99%", fee: "₹1500" },
      { id: "dr-nidhi-chauhan-anaes", name: "Dr. Nidhi Chauhan", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Regional Anaesthesia", experience: "13+", recommended: "97%", fee: "₹1100" },
      { id: "dr-vikash-singh-anaes", name: "Dr. Vikash Singh", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", specialization: "Neuroanaesthesia", experience: "10+", recommended: "96%", fee: "₹1000" },
      { id: "dr-swati-mathur-anaes", name: "Dr. Swati Mathur", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Pain Management", experience: "8+", recommended: "95%", fee: "₹800" },
    ],
  },
  {
    slug: "urology",
    name: "Urology",
    images: [
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
    ],
    content: [
      "The Department of Urology at Hippocare Hospital provides comprehensive diagnostic and surgical services for conditions affecting the urinary tract in both men and women, as well as disorders of the male reproductive system. Our urologists combine clinical expertise with minimally invasive surgical techniques to deliver effective, patient-friendly care.",
      "Our team of experienced urologists and uro-surgeons specializes in the management of kidney stones, urinary tract infections, prostate disorders (BPH and prostate cancer), bladder conditions, urinary incontinence, male infertility, erectile dysfunction, and congenital urological abnormalities in children.",
      "The department is equipped with advanced endoscopic and laparoscopic surgical systems, including flexible and rigid ureteroscopes, holmium laser lithotripsy for stone fragmentation, transurethral resection (TURP) setups, and laparoscopic platforms for minimally invasive kidney and prostate surgeries.",
      "For kidney stone management, we offer a complete range of treatments from extracorporeal shock wave lithotripsy (ESWL) and ureteroscopic laser lithotripsy to percutaneous nephrolithotomy (PCNL) for large and complex stones. Our stone clinic also focuses on metabolic evaluation and dietary counseling to prevent recurrence.",
      "Prostate health is a major focus area. We provide thorough evaluations including PSA testing, transrectal ultrasound, and prostate biopsy for early cancer detection. Treatment options range from medical management and minimally invasive procedures to robotic-assisted surgical approaches when needed.",
      "Our pediatric urology services address conditions such as undescended testes, hypospadias, vesicoureteral reflux, and pediatric kidney stones. Our surgeons use child-friendly approaches and collaborate with pediatricians and anaesthesiologists to ensure the best outcomes for young patients.",
      "At Hippocare, we understand that urological conditions can be sensitive and personal. Our department maintains strict patient confidentiality and creates a respectful, non-judgmental environment where patients feel comfortable discussing their concerns. We believe that early consultation and open communication are key to successful treatment outcomes.",
    ],
    expertDoctors: [
      { id: "dr-manoj-kumar-uro", name: "Dr. Manoj Kumar", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80", specialization: "Uro-Oncology", experience: "18+", recommended: "99%", fee: "₹1300" },
      { id: "dr-priya-kapoor-uro", name: "Dr. Priya Kapoor", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", specialization: "Endourology & Stone Disease", experience: "12+", recommended: "97%", fee: "₹1000" },
      { id: "dr-saurabh-jain-uro", name: "Dr. Saurabh Jain", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", specialization: "Pediatric Urology", experience: "10+", recommended: "96%", fee: "₹900" },
      { id: "dr-neha-agarwal-uro", name: "Dr. Neha Agarwal", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80", specialization: "Female Urology", experience: "8+", recommended: "95%", fee: "₹800" },
    ],
  },
];
