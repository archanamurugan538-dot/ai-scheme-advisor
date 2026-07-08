/* ============================================
   AI GOVERNMENT SCHEME ADVISOR - JAVASCRIPT
   Scheme Database, Eligibility Engine & UI Logic
   ============================================ */

// ========== SCHEME DATABASE ==========
const schemesDB = [
    // ===== CENTRAL GOVERNMENT SCHEMES =====
    {
        id: 'pm-kisan',
        name: 'PM-KISAN Samman Nidhi',
        type: 'central',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        category: 'Agriculture',
        icon: '🌾',
        description: 'Direct income support of ₹6,000 per year in three equal installments to small and marginal farmer families having combined land holding up to 2 hectares.',
        benefits: ['₹6,000/year direct transfer', '3 installments of ₹2,000', 'No intermediary involved'],
        eligibility: {
            occupation: ['farmer'],
            landOwnership: ['marginal', 'small'],
            maxIncome: 500000,
            documents: ['Aadhaar Card', 'Land Records', 'Bank Account Passbook', 'State Domicile Certificate']
        },
        applicationLink: 'https://pmkisan.gov.in/',
        whyEligible: 'You are a farmer with small/marginal land holding.',
        howToApply: 'Register online at pmkisan.gov.in or visit nearest CSC (Common Service Centre). You can also approach your local Patwari/Revenue Officer.'
    },
    {
        id: 'pm-awas-gramin',
        name: 'PM Awas Yojana - Gramin (PMAY-G)',
        type: 'central',
        ministry: 'Ministry of Rural Development',
        category: 'Housing',
        icon: '🏠',
        description: 'Financial assistance for construction of pucca houses for rural poor who are houseless or living in kutcha/dilapidated houses. Assistance of ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult areas.',
        benefits: ['₹1.20-1.30 lakh housing assistance', 'MGNREGA wage for 90 days', 'Toilet assistance under SBM'],
        eligibility: {
            areaType: ['rural'],
            housing: ['homeless', 'kutcha'],
            maxIncome: 300000,
            documents: ['Aadhaar Card', 'BPL Certificate', 'Income Certificate', 'Land Documents', 'Bank Passbook', 'Photograph']
        },
        applicationLink: 'https://pmayg.nic.in/',
        whyEligible: 'You are from a rural area without adequate housing.',
        howToApply: 'Apply through Gram Panchayat or Block Development Office. Beneficiaries are selected from SECC 2011 data and Gram Sabha verification.'
    },
    {
        id: 'pm-awas-urban',
        name: 'PM Awas Yojana - Urban (PMAY-U)',
        type: 'central',
        ministry: 'Ministry of Housing & Urban Affairs',
        category: 'Housing',
        icon: '🏗️',
        description: 'Affordable housing for urban poor with a credit-linked subsidy on home loans. Interest subsidy of 6.5% for EWS/LIG, 4% for MIG-I, and 3% for MIG-II categories.',
        benefits: ['Interest subsidy up to 6.5%', 'Credit-linked subsidy scheme', 'In-situ slum redevelopment'],
        eligibility: {
            areaType: ['urban', 'semi-urban'],
            housing: ['homeless', 'kutcha', 'rented', 'semi-pucca'],
            maxIncome: 1800000,
            documents: ['Aadhaar Card', 'Income Certificate', 'Property Documents', 'Bank Statement', 'PAN Card']
        },
        applicationLink: 'https://pmaymis.gov.in/',
        whyEligible: 'You are an urban resident eligible for housing subsidy.',
        howToApply: 'Apply online at pmaymis.gov.in or through nearest CSC. You can also apply through empaneled banks for the CLSS component.'
    },
    {
        id: 'ayushman-bharat',
        name: 'Ayushman Bharat - PM-JAY',
        type: 'central',
        ministry: 'Ministry of Health & Family Welfare',
        category: 'Health',
        icon: '🏥',
        description: 'World\'s largest health insurance scheme providing free health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization to bottom 40% of the Indian population.',
        benefits: ['₹5 lakh health coverage/year', 'Cashless treatment', '1,500+ procedures covered', 'Pre & post hospitalization expenses'],
        eligibility: {
            maxIncome: 300000,
            bplCard: ['yes'],
            rationCard: ['aay', 'phh'],
            documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Caste Certificate (if applicable)']
        },
        applicationLink: 'https://pmjay.gov.in/',
        whyEligible: 'Your family income qualifies you for free health coverage.',
        howToApply: 'Check eligibility at mera.pmjay.gov.in using mobile number or ration card. Visit nearest Ayushman Mitra at empaneled hospital or CSC.'
    },
    {
        id: 'pm-ujjwala',
        name: 'PM Ujjwala Yojana',
        type: 'central',
        ministry: 'Ministry of Petroleum & Natural Gas',
        category: 'Social Welfare',
        icon: '🔥',
        description: 'Free LPG connections to women of BPL households along with first refill and stove free of cost. Aims to replace unclean cooking fuels with clean LPG.',
        benefits: ['Free LPG connection', 'Free first refill', 'Free hot plate/stove', 'EMI facility for refills'],
        eligibility: {
            gender: ['female'],
            maxIncome: 200000,
            bplCard: ['yes'],
            documents: ['Aadhaar Card', 'BPL Certificate', 'Ration Card', 'Bank Passbook', 'Passport Photo']
        },
        applicationLink: 'https://www.pmuy.gov.in/',
        whyEligible: 'You belong to a BPL family and are eligible for free LPG connection.',
        howToApply: 'Apply at nearest LPG distributor (HP, Bharat, Indane) with required documents.'
    },
    {
        id: 'pm-mudra',
        name: 'PM MUDRA Yojana',
        type: 'central',
        ministry: 'Ministry of Finance',
        category: 'Business & MSME',
        icon: '💼',
        description: 'Loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises. Three categories: Shishu (up to ₹50,000), Kishore (₹50,000-5 lakh), Tarun (₹5-10 lakh).',
        benefits: ['Loans up to ₹10 lakh', 'No collateral required', 'Low interest rates', 'MUDRA Card for working capital'],
        eligibility: {
            occupation: ['self-employed', 'artisan'],
            minAge: 18,
            documents: ['Aadhaar Card', 'PAN Card', 'Business Plan', 'Address Proof', 'Bank Statements', 'Passport Photos']
        },
        applicationLink: 'https://www.mudra.org.in/',
        whyEligible: 'You are self-employed / business owner eligible for collateral-free loans.',
        howToApply: 'Apply at any bank, NBFC, or MFI. Download forms from mudra.org.in or apply through Udyamimitra portal.'
    },
    {
        id: 'sukanya-samriddhi',
        name: 'Sukanya Samriddhi Yojana',
        type: 'central',
        ministry: 'Ministry of Finance',
        category: 'Women & Child',
        icon: '👧',
        description: 'Small deposit scheme for girl child with high interest rate (8.2% p.a.) and tax benefits. Account can be opened for girl child below 10 years with minimum deposit of ₹250.',
        benefits: ['8.2% interest rate', 'Tax deduction under 80C', 'Maturity at age 21', 'Partial withdrawal for education at 18'],
        eligibility: {
            gender: ['female', 'male'],
            children: 1,
            documents: ['Birth Certificate of Girl Child', 'Parent/Guardian Aadhaar', 'Address Proof', 'Passport Photos']
        },
        applicationLink: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
        whyEligible: 'You have a girl child and can benefit from this high-interest savings scheme.',
        howToApply: 'Open account at any Post Office or authorized bank branch with the girl child\'s birth certificate.'
    },
    {
        id: 'pm-svanidhi',
        name: 'PM SVANidhi (Street Vendors)',
        type: 'central',
        ministry: 'Ministry of Housing & Urban Affairs',
        category: 'Employment',
        icon: '🛒',
        description: 'Working capital loan up to ₹10,000 for street vendors affected by COVID-19. On timely/early repayment, vendors can avail next tranche of ₹20,000 and then ₹50,000.',
        benefits: ['Loan up to ₹50,000', '7% interest subsidy', 'Cashback incentives on digital payments', 'No collateral'],
        eligibility: {
            occupation: ['self-employed', 'daily-wage'],
            areaType: ['urban', 'semi-urban'],
            documents: ['Aadhaar Card', 'Vending Certificate/Letter of Recommendation', 'Bank Account', 'Passport Photo']
        },
        applicationLink: 'https://pmsvanidhi.mohua.gov.in/',
        whyEligible: 'You are a self-employed urban worker eligible for vendor support.',
        howToApply: 'Apply online at pmsvanidhi.mohua.gov.in or through CSC/ULB. Lending institutions include banks, NBFCs, and MFIs.'
    },
    {
        id: 'national-scholarship',
        name: 'National Scholarship Portal (NSP)',
        type: 'central',
        ministry: 'Ministry of Education',
        category: 'Education',
        icon: '🎓',
        description: 'Umbrella portal for various Central Government scholarships including Pre-Matric, Post-Matric, Merit-cum-Means for minorities, SC/ST/OBC students, and differently abled.',
        benefits: ['Tuition fee reimbursement', 'Maintenance allowance', 'Book & equipment grants', 'Multiple schemes available'],
        eligibility: {
            occupation: ['student'],
            education: ['secondary', 'higher-secondary', 'graduate', 'post-graduate', 'doctorate', 'diploma'],
            maxIncome: 800000,
            category: ['sc', 'st', 'obc', 'minority', 'ews'],
            documents: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate', 'Previous Marksheet', 'Bank Passbook', 'Institution Bonafide']
        },
        applicationLink: 'https://scholarships.gov.in/',
        whyEligible: 'You are a student from an eligible category for government scholarships.',
        howToApply: 'Register and apply online at scholarships.gov.in. Application verification done through institution and district authority.'
    },
    {
        id: 'atal-pension',
        name: 'Atal Pension Yojana (APY)',
        type: 'central',
        ministry: 'Ministry of Finance',
        category: 'Pension',
        icon: '👴',
        description: 'Guaranteed pension of ₹1,000 to ₹5,000 per month after age 60, based on contribution. Open to all bank account holders aged 18-40 in the unorganized sector.',
        benefits: ['₹1,000-5,000 monthly pension', 'Government co-contribution', 'Spouse gets same pension', 'Nominee gets corpus'],
        eligibility: {
            minAge: 18,
            maxAge: 40,
            bankAccount: ['yes'],
            documents: ['Aadhaar Card', 'Bank Account', 'Mobile Number']
        },
        applicationLink: 'https://www.npscra.nsdl.co.in/scheme-details.php',
        whyEligible: 'You are in the eligible age group for guaranteed pension benefits.',
        howToApply: 'Apply at your bank branch or through net banking. Auto-debit from savings account for monthly contributions.'
    },
    {
        id: 'pm-jeevan-jyoti',
        name: 'PM Jeevan Jyoti Bima Yojana',
        type: 'central',
        ministry: 'Ministry of Finance',
        category: 'Insurance',
        icon: '🛡️',
        description: 'Life insurance cover of ₹2 lakh at a premium of just ₹436 per year (₹1.25/day). Available to people aged 18-50 with a bank account.',
        benefits: ['₹2 lakh life insurance', 'Premium only ₹436/year', 'Auto-debit from bank', 'Simple enrollment'],
        eligibility: {
            minAge: 18,
            maxAge: 50,
            bankAccount: ['yes'],
            documents: ['Aadhaar Card', 'Bank Account', 'Consent-cum-Declaration Form']
        },
        applicationLink: 'https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx',
        whyEligible: 'Your age and bank account status make you eligible for affordable life insurance.',
        howToApply: 'Enroll through your bank branch, net banking, or by submitting consent form at the bank.'
    },
    {
        id: 'mgnrega',
        name: 'MGNREGA (100 Days Employment)',
        type: 'central',
        ministry: 'Ministry of Rural Development',
        category: 'Employment',
        icon: '⛏️',
        description: 'Guaranteed 100 days of wage employment per year to every rural household whose adult members volunteer for unskilled manual work. Daily wage of ₹250-350 depending on state.',
        benefits: ['100 days guaranteed employment', 'Daily wages ₹250-350', 'Unemployment allowance if no work', 'Work within 5 km radius'],
        eligibility: {
            areaType: ['rural'],
            minAge: 18,
            documents: ['Aadhaar Card', 'Job Card (issued by Gram Panchayat)', 'Bank/Post Office Account', 'Passport Photo']
        },
        applicationLink: 'https://nrega.nic.in/',
        whyEligible: 'You are a rural adult eligible for guaranteed wage employment.',
        howToApply: 'Apply for Job Card at Gram Panchayat. Once issued, submit written application for work. Work must be provided within 15 days.'
    },
    {
        id: 'skill-india',
        name: 'Skill India / PMKVY',
        type: 'central',
        ministry: 'Ministry of Skill Development & Entrepreneurship',
        category: 'Skill Development',
        icon: '🔧',
        description: 'Free skill training in 40+ sectors with certification, assessment, and placement support. Short-term training (150-300 hours) and Recognition of Prior Learning for those with existing skills.',
        benefits: ['Free skill training', 'Industry-recognized certificate', 'Placement assistance', '₹8,000 reward on certification'],
        eligibility: {
            minAge: 15,
            maxAge: 59,
            documents: ['Aadhaar Card', 'Bank Account', 'Educational Certificates']
        },
        applicationLink: 'https://www.pmkvyofficial.org/',
        whyEligible: 'You are eligible for free government skill training and certification.',
        howToApply: 'Find nearest training center at pmkvyofficial.org. Walk-in enrollment available at PMKVY Training Centres across India.'
    },
    {
        id: 'pm-vishwakarma',
        name: 'PM Vishwakarma Yojana',
        type: 'central',
        ministry: 'Ministry of Micro, Small and Medium Enterprises',
        category: 'Artisan Support',
        icon: '🏺',
        description: 'Support for traditional artisans and craftspeople working with hands and tools. Provides recognition, skill training, toolkit incentive, credit support up to ₹3 lakh, and market linkage.',
        benefits: ['PM Vishwakarma Certificate & ID', 'Skill training with stipend', '₹15,000 toolkit incentive', 'Collateral-free loan up to ₹3 lakh at 5%'],
        eligibility: {
            occupation: ['artisan', 'self-employed'],
            documents: ['Aadhaar Card', 'Bank Account', 'Mobile Number', 'Ration Card']
        },
        applicationLink: 'https://pmvishwakarma.gov.in/',
        whyEligible: 'You are an artisan/craftsperson eligible for government support.',
        howToApply: 'Register at pmvishwakarma.gov.in. Verification by Gram Panchayat/ULB. Training at designated centers.'
    },
    {
        id: 'pm-suraksha-bima',
        name: 'PM Suraksha Bima Yojana',
        type: 'central',
        ministry: 'Ministry of Finance',
        category: 'Insurance',
        icon: '🏦',
        description: 'Accidental death and disability cover of ₹2 lakh at just ₹20 per year. Available for bank account holders aged 18-70.',
        benefits: ['₹2 lakh accident cover', 'Premium only ₹20/year', '₹1 lakh partial disability cover'],
        eligibility: {
            minAge: 18,
            maxAge: 70,
            bankAccount: ['yes'],
            documents: ['Aadhaar Card', 'Bank Account', 'Consent Form']
        },
        applicationLink: 'https://www.jansuraksha.gov.in/Forms-PMSBY.aspx',
        whyEligible: 'Your age qualifies you for extremely affordable accident insurance.',
        howToApply: 'Enroll through bank branch, net banking, or submit consent form at bank. Auto-debit of ₹20/year from account.'
    },
    {
        id: 'national-pension-system',
        name: 'National Pension System (NPS)',
        type: 'central',
        ministry: 'Ministry of Finance',
        category: 'Pension',
        icon: '📊',
        description: 'Voluntary, long-term retirement savings scheme with tax benefits. Contribute regularly during working life, build a pension corpus, and receive regular income after retirement.',
        benefits: ['Tax deduction up to ₹2 lakh', 'Market-linked returns', 'Choose your fund manager', 'Partial withdrawal allowed'],
        eligibility: {
            minAge: 18,
            maxAge: 70,
            documents: ['Aadhaar Card', 'PAN Card', 'Bank Account', 'Photograph']
        },
        applicationLink: 'https://www.npscra.nsdl.co.in/',
        whyEligible: 'You can start building a retirement corpus with tax benefits.',
        howToApply: 'Open NPS account online at enps.nsdl.com or through bank/post office. KYC required with Aadhaar or PAN.'
    },

    // ===== STATE GOVERNMENT SCHEMES =====
    {
        id: 'rythu-bandhu',
        name: 'Rythu Bandhu (Farmer Support)',
        type: 'state',
        state: 'telangana',
        ministry: 'Government of Telangana - Agriculture Department',
        category: 'Agriculture',
        icon: '🌱',
        description: 'Investment support of ₹10,000 per acre per year (₹5,000 each for Rabi and Kharif seasons) directly to farmer-owners. One of India\'s first direct farmer benefit schemes.',
        benefits: ['₹10,000/acre/year', 'Direct bank transfer', 'Both crop seasons covered'],
        eligibility: {
            state: ['telangana'],
            occupation: ['farmer'],
            landOwnership: ['marginal', 'small', 'medium', 'large'],
            documents: ['Aadhaar Card', 'Pattadar Passbook', 'Bank Passbook']
        },
        applicationLink: 'https://rythubandhu.telangana.gov.in/',
        whyEligible: 'You are a Telangana farmer with land ownership.',
        howToApply: 'Registered land-owning farmers are automatically identified through land records. Contact your local MRO office if not receiving benefits.'
    },
    {
        id: 'kalia',
        name: 'KALIA Scheme',
        type: 'state',
        state: 'odisha',
        ministry: 'Government of Odisha - Agriculture Department',
        category: 'Agriculture',
        icon: '🌿',
        description: 'Krushak Assistance for Livelihood and Income Augmentation. Financial assistance of ₹25,000 per farm family over 5 seasons (₹5,000 each) for cultivation and livelihood support.',
        benefits: ['₹25,000 over 5 seasons', 'Life insurance of ₹2 lakh', 'Crop loan interest free'],
        eligibility: {
            state: ['odisha'],
            occupation: ['farmer', 'daily-wage'],
            documents: ['Aadhaar Card', 'Land Records', 'Bank Account']
        },
        applicationLink: 'https://kalia.odisha.gov.in/',
        whyEligible: 'You are an Odisha farmer eligible for KALIA financial assistance.',
        howToApply: 'Apply at kalia.odisha.gov.in or through Gram Panchayat.'
    },
    {
        id: 'ladli-behna',
        name: 'Ladli Behna Yojana',
        type: 'state',
        state: 'madhya-pradesh',
        ministry: 'Government of Madhya Pradesh',
        category: 'Women Empowerment',
        icon: '👩',
        description: 'Monthly financial assistance of ₹1,250 to women aged 21-60 years in Madhya Pradesh. Aims to promote women\'s economic independence and empowerment.',
        benefits: ['₹1,250/month (₹15,000/year)', 'Direct bank transfer', 'No income tax on benefit'],
        eligibility: {
            state: ['madhya-pradesh'],
            gender: ['female'],
            minAge: 21,
            maxAge: 60,
            maxIncome: 250000,
            documents: ['Aadhaar Card', 'Samagra ID', 'Bank Passbook', 'Passport Photo']
        },
        applicationLink: 'https://cmladlibahna.mp.gov.in/',
        whyEligible: 'You are a woman in MP eligible for monthly financial support.',
        howToApply: 'Apply online at cmladlibahna.mp.gov.in or at designated camp sites.'
    },
    {
        id: 'kanyashree',
        name: 'Kanyashree Prakalpa',
        type: 'state',
        state: 'west-bengal',
        ministry: 'Government of West Bengal - Women & Child Development',
        category: 'Education & Women',
        icon: '📚',
        description: 'Annual scholarship of ₹750 for school-going girls (Class VIII-XII) and one-time grant of ₹25,000 at age 18 if unmarried and pursuing education.',
        benefits: ['₹750 annual scholarship', '₹25,000 one-time grant at 18', 'Prevents child marriage'],
        eligibility: {
            state: ['west-bengal'],
            gender: ['female'],
            minAge: 13,
            maxAge: 18,
            occupation: ['student'],
            maxIncome: 120000,
            documents: ['Aadhaar Card', 'School ID', 'Income Certificate', 'Age Proof', 'Bank Account']
        },
        applicationLink: 'https://wbkanyashree.gov.in/',
        whyEligible: 'You are a girl student in West Bengal eligible for educational support.',
        howToApply: 'Apply through school institution. Forms available at school or download from wbkanyashree.gov.in.'
    },
    {
        id: 'cm-kisan-samman',
        name: 'Mukhyamantri Kisan Samman Nidhi',
        type: 'state',
        state: 'jharkhand',
        ministry: 'Government of Jharkhand - Agriculture Department',
        category: 'Agriculture',
        icon: '🌾',
        description: 'Additional ₹5,000 per year to Jharkhand farmers on top of PM-KISAN, making total support ₹11,000 per year for eligible farm families.',
        benefits: ['₹5,000/year additional support', 'Tops up PM-KISAN benefits', 'Direct bank transfer'],
        eligibility: {
            state: ['jharkhand'],
            occupation: ['farmer'],
            landOwnership: ['marginal', 'small'],
            maxIncome: 500000,
            documents: ['Aadhaar Card', 'Land Records', 'PM-KISAN Registration', 'Bank Passbook']
        },
        applicationLink: 'https://msknregistry.jharkhand.gov.in/',
        whyEligible: 'You are a Jharkhand farmer eligible for state-level income support.',
        howToApply: 'Apply online at the Jharkhand Farmer Registration portal or visit your nearest CSC.'
    },
    {
        id: 'amma-unavagam',
        name: 'Amma Unavagam (Subsidized Canteens)',
        type: 'state',
        state: 'tamil-nadu',
        ministry: 'Government of Tamil Nadu',
        category: 'Food Security',
        icon: '🍛',
        description: 'Subsidized meals at ₹1-5 through government-run canteens across Tamil Nadu. Provides idli at ₹1, variety rice at ₹5, sambar rice at ₹5, and curd rice at ₹3.',
        benefits: ['Meals as low as ₹1', 'Available across TN', 'Nutritious food for all'],
        eligibility: {
            state: ['tamil-nadu'],
            documents: ['No documents required']
        },
        applicationLink: 'https://www.tn.gov.in/',
        whyEligible: 'Available for all Tamil Nadu residents — no eligibility restrictions.',
        howToApply: 'Visit any Amma Unavagam canteen. No application needed.'
    },
    {
        id: 'ysr-pension',
        name: 'YSR Pension Kanuka',
        type: 'state',
        state: 'andhra-pradesh',
        ministry: 'Government of Andhra Pradesh',
        category: 'Pension',
        icon: '👵',
        description: 'Enhanced social security pension of ₹2,750 per month for senior citizens, widows, disabled persons, weavers, toddy tappers, and fishermen in Andhra Pradesh.',
        benefits: ['₹2,750/month pension', 'Door-step delivery', 'Multiple categories covered'],
        eligibility: {
            state: ['andhra-pradesh'],
            minAge: 60,
            maxIncome: 300000,
            documents: ['Aadhaar Card', 'Age Proof', 'Income Certificate', 'White Ration Card', 'Bank Passbook']
        },
        applicationLink: 'https://navasakam.ap.gov.in/',
        whyEligible: 'You are a senior citizen in AP eligible for enhanced pension.',
        howToApply: 'Apply through Ward/Village Secretariat or Meeseva centers.'
    },
    {
        id: 'orunodoi',
        name: 'Orunodoi Scheme',
        type: 'state',
        state: 'assam',
        ministry: 'Government of Assam',
        category: 'Women Empowerment',
        icon: '🌅',
        description: 'Monthly financial assistance of ₹1,250 to women of economically weaker families in Assam. Covers widows, separated women, differently-abled, and women from BPL families.',
        benefits: ['₹1,250/month', 'Direct bank transfer', 'Covers 30 lakh+ families'],
        eligibility: {
            state: ['assam'],
            gender: ['female'],
            maxIncome: 200000,
            documents: ['Aadhaar Card', 'Voter ID', 'Bank Account', 'Income Certificate']
        },
        applicationLink: 'https://orunodoi.assam.gov.in/',
        whyEligible: 'You are a woman in Assam from an economically weaker family.',
        howToApply: 'Apply through Circle Officer or Block Development Officer.'
    },
    {
        id: 'maharashtra-lek-ladki',
        name: 'Lek Ladki Yojana',
        type: 'state',
        state: 'maharashtra',
        ministry: 'Government of Maharashtra',
        category: 'Women & Child',
        icon: '👶',
        description: 'Financial assistance at different stages of a girl\'s life — ₹5,000 at birth, ₹4,000 in Class 1, ₹6,000 in Class 6, ₹8,000 in Class 11, and ₹75,000 at age 18.',
        benefits: ['Staggered financial support', '₹75,000 at age 18', 'Promotes girl education'],
        eligibility: {
            state: ['maharashtra'],
            gender: ['female'],
            maxIncome: 100000,
            bplCard: ['yes'],
            documents: ['Aadhaar Card', 'Birth Certificate', 'Yellow/Orange Ration Card', 'Bank Account', 'Income Certificate']
        },
        applicationLink: 'https://womenchild.maharashtra.gov.in/',
        whyEligible: 'You are from a Maharashtra BPL family with a girl child.',
        howToApply: 'Apply at Anganwadi center or District Women & Child Development Officer.'
    },
    {
        id: 'rajasthan-chiranjeevi',
        name: 'Chiranjeevi Health Insurance',
        type: 'state',
        state: 'rajasthan',
        ministry: 'Government of Rajasthan - Health Department',
        category: 'Health',
        icon: '❤️',
        description: 'Universal health insurance scheme providing ₹25 lakh coverage per family per year for IPD and ₹25 lakh for critical illness. Free for BPL and ₹850/year for others.',
        benefits: ['₹25 lakh health cover', '₹25 lakh critical illness', '1,576 procedures covered', 'Cashless treatment'],
        eligibility: {
            state: ['rajasthan'],
            documents: ['Jan Aadhaar Card', 'Aadhaar Card', 'Bank Account (for premium payment)']
        },
        applicationLink: 'https://chiranjeevi.rajasthan.gov.in/',
        whyEligible: 'You are a Rajasthan resident eligible for comprehensive health coverage.',
        howToApply: 'Register at chiranjeevi.rajasthan.gov.in or through E-Mitra kiosk using Jan Aadhaar number.'
    },
    {
        id: 'up-kanya-sumangala',
        name: 'Kanya Sumangala Yojana',
        type: 'state',
        state: 'uttar-pradesh',
        ministry: 'Government of Uttar Pradesh',
        category: 'Women & Child',
        icon: '🎀',
        description: 'Total ₹15,000 to girl child in 6 installments from birth to graduation. Promotes health, education, and empowerment of girls in UP.',
        benefits: ['₹15,000 in 6 installments', 'From birth to graduation', 'Up to 2 girls per family'],
        eligibility: {
            state: ['uttar-pradesh'],
            gender: ['female'],
            maxIncome: 300000,
            documents: ['Aadhaar Card', 'Income Certificate', 'Birth Certificate', 'Bank Account', 'School Certificate']
        },
        applicationLink: 'https://mksy.up.gov.in/',
        whyEligible: 'You have a girl child in UP and qualify for financial support.',
        howToApply: 'Apply online at mksy.up.gov.in. Offline forms available at BDO/SDM/DPO offices.'
    },
    {
        id: 'karnataka-gruha-lakshmi',
        name: 'Gruha Lakshmi Yojana',
        type: 'state',
        state: 'karnataka',
        ministry: 'Government of Karnataka',
        category: 'Women Empowerment',
        icon: '🏡',
        description: 'Monthly financial assistance of ₹2,000 to women heads of households in Karnataka. Aims to support women-led families and promote financial independence.',
        benefits: ['₹2,000/month', 'Direct bank transfer', 'Women household heads'],
        eligibility: {
            state: ['karnataka'],
            gender: ['female'],
            documents: ['Aadhaar Card', 'Ration Card', 'Bank Account', 'BPL Certificate']
        },
        applicationLink: 'https://sevasindhuservices.karnataka.gov.in/',
        whyEligible: 'You are a woman head of household in Karnataka.',
        howToApply: 'Apply through Seva Sindhu portal or at designated government offices.'
    },
    {
        id: 'bihar-student-credit',
        name: 'Bihar Student Credit Card',
        type: 'state',
        state: 'bihar',
        ministry: 'Government of Bihar - Education Department',
        category: 'Education',
        icon: '💳',
        description: 'Education loan of up to ₹4 lakh at 0% interest for 12th-pass students for higher education. Available for various courses including engineering, medical, MBA, and professional courses.',
        benefits: ['₹4 lakh at 0% interest', '42 approved courses', 'Living expenses covered', 'No collateral needed'],
        eligibility: {
            state: ['bihar'],
            occupation: ['student'],
            education: ['higher-secondary', 'graduate'],
            maxAge: 25,
            documents: ['Aadhaar Card', '12th Marksheet', 'Admission Letter', 'Income Certificate', 'Bank Account']
        },
        applicationLink: 'https://www.7nishchay-yuvaupmission.bihar.gov.in/',
        whyEligible: 'You are a Bihar student eligible for interest-free education loan.',
        howToApply: 'Apply online at 7nishchay portal or through DRCC (District Registration cum Counselling Centre).'
    },
    {
        id: 'kerala-welfare-pension',
        name: 'Kerala Social Security Pension',
        type: 'state',
        state: 'kerala',
        ministry: 'Government of Kerala - Social Justice Department',
        category: 'Pension',
        icon: '🌴',
        description: 'Social security pension of ₹1,600/month for senior citizens, ₹1,600 for widows, ₹1,600 for disabled, and ₹1,100 for agricultural workers in Kerala.',
        benefits: ['₹1,100-1,600/month', 'Multiple categories', 'Regular disbursement'],
        eligibility: {
            state: ['kerala'],
            minAge: 60,
            maxIncome: 100000,
            documents: ['Aadhaar Card', 'Age Proof', 'Income Certificate', 'Bank Account', 'Ration Card']
        },
        applicationLink: 'https://welfarepension.lsgkerala.gov.in/',
        whyEligible: 'You are a senior citizen in Kerala eligible for social security pension.',
        howToApply: 'Apply through Local Self-Government Department or online at welfarepension.lsgkerala.gov.in.'
    },
    {
        id: 'punjab-ashirwad',
        name: 'Shagun Yojana (Ashirwad)',
        type: 'state',
        state: 'punjab',
        ministry: 'Government of Punjab - Social Security',
        category: 'Social Welfare',
        icon: '💐',
        description: 'Financial assistance of ₹51,000 for marriage of daughters of SC/BC/EWS families and widows/destitute women in Punjab.',
        benefits: ['₹51,000 marriage assistance', 'SC/BC/EWS families', 'Widow/destitute women'],
        eligibility: {
            state: ['punjab'],
            gender: ['female'],
            category: ['sc', 'obc', 'ews'],
            minAge: 18,
            documents: ['Aadhaar Card', 'Caste Certificate', 'Income Certificate', 'Marriage Invitation', 'Bank Account']
        },
        applicationLink: 'https://punjab.gov.in/',
        whyEligible: 'You belong to an eligible category in Punjab for marriage assistance.',
        howToApply: 'Apply at District Social Security Office at least 15 days before marriage.'
    }
];


// ========== ELIGIBILITY ENGINE ==========
function calculateEligibility(userProfile, scheme) {
    let score = 0;
    let maxScore = 0;
    let reasons = [];

    const elig = scheme.eligibility;

    // State Match (for state schemes)
    if (scheme.type === 'state') {
        maxScore += 30;
        if (scheme.state === userProfile.state) {
            score += 30;
            reasons.push('State residence matches');
        } else {
            return { score: 0, percentage: 0, reasons: ['Not applicable — different state'] };
        }
    }

    // Occupation Match
    if (elig.occupation && elig.occupation.length > 0) {
        maxScore += 20;
        if (elig.occupation.includes(userProfile.occupation)) {
            score += 20;
            reasons.push(`Occupation matches (${userProfile.occupation})`);
        }
    }

    // Age Match
    if (elig.minAge || elig.maxAge) {
        maxScore += 15;
        const age = parseInt(userProfile.age);
        const minOk = !elig.minAge || age >= elig.minAge;
        const maxOk = !elig.maxAge || age <= elig.maxAge;
        if (minOk && maxOk) {
            score += 15;
            reasons.push('Age criteria met');
        }
    }

    // Income Match
    if (elig.maxIncome) {
        maxScore += 20;
        if (parseInt(userProfile.annualIncome) <= elig.maxIncome) {
            score += 20;
            reasons.push('Income within eligible limit');
        } else {
            score += 5; // partial
            reasons.push('Income slightly above limit — may still qualify');
        }
    }

    // Gender Match
    if (elig.gender && elig.gender.length > 0) {
        maxScore += 10;
        if (elig.gender.includes(userProfile.gender)) {
            score += 10;
            reasons.push('Gender criteria met');
        }
    }

    // Category Match
    if (elig.category && elig.category.length > 0) {
        maxScore += 15;
        if (elig.category.includes(userProfile.category)) {
            score += 15;
            reasons.push(`Category matches (${userProfile.category.toUpperCase()})`);
        } else {
            score += 3;
        }
    }

    // Area Type Match
    if (elig.areaType && elig.areaType.length > 0) {
        maxScore += 10;
        if (elig.areaType.includes(userProfile.areaType)) {
            score += 10;
            reasons.push('Area type matches');
        }
    }

    // Land Ownership Match
    if (elig.landOwnership && elig.landOwnership.length > 0) {
        maxScore += 10;
        if (elig.landOwnership.includes(userProfile.landOwnership)) {
            score += 10;
            reasons.push('Land ownership criteria met');
        }
    }

    // Housing Match
    if (elig.housing && elig.housing.length > 0) {
        maxScore += 10;
        if (elig.housing.includes(userProfile.housing)) {
            score += 10;
            reasons.push('Housing status qualifies');
        }
    }

    // BPL Card
    if (elig.bplCard) {
        maxScore += 10;
        if (userProfile.bplCard === 'yes') {
            score += 10;
            reasons.push('BPL card holder');
        }
    }

    // Bank Account
    if (elig.bankAccount) {
        maxScore += 5;
        if (userProfile.bankAccount === 'yes') {
            score += 5;
            reasons.push('Has bank account');
        }
    }

    // Ration Card
    if (elig.rationCard) {
        maxScore += 10;
        if (elig.rationCard.includes(userProfile.rationCard)) {
            score += 10;
            reasons.push('Ration card type matches');
        }
    }

    // Education Match
    if (elig.education && elig.education.length > 0) {
        maxScore += 10;
        if (elig.education.includes(userProfile.education)) {
            score += 10;
            reasons.push('Education level qualifies');
        }
    }

    // Children
    if (elig.children) {
        maxScore += 10;
        if (parseInt(userProfile.children) >= elig.children) {
            score += 10;
            reasons.push('Has eligible children');
        }
    }

    // General scheme (no strict criteria, e.g. Amma Unavagam)
    if (maxScore === 0) {
        return { score: 100, percentage: 100, reasons: ['Open to all eligible residents'] };
    }

    const percentage = Math.round((score / maxScore) * 100);
    return { score, percentage, reasons };
}


function findEligibleSchemes(userProfile) {
    const results = [];

    schemesDB.forEach(scheme => {
        const result = calculateEligibility(userProfile, scheme);

        // Include if score is above 40%
        if (result.percentage >= 40) {
            results.push({
                ...scheme,
                eligibilityScore: result.percentage,
                matchReasons: result.reasons,
                scoreLevel: result.percentage >= 75 ? 'high' : result.percentage >= 55 ? 'medium' : 'low'
            });
        }
    });

    // Sort by score descending
    results.sort((a, b) => b.eligibilityScore - a.eligibilityScore);
    return results;
}


// ========== UI LOGIC ==========
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCounters();
    initFormNavigation();
    initMobileMenu();
    initSmoothScroll();
    initModalHandlers();
});


// Particle Background
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
        p.style.setProperty('--ty', (Math.random() * 200 - 100) + 'px');
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.animationDuration = (10 + Math.random() * 20) + 's';
        container.appendChild(p);
    }
}


// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCount(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCount(el, target) {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 25);
}


// Form Navigation
function initFormNavigation() {
    const form = document.getElementById('advisorForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    const progressFill = document.getElementById('progressFill');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    let currentStep = 1;
    const totalSteps = steps.length;

    function updateStep(step) {
        steps.forEach(s => s.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');

        progressSteps.forEach(s => {
            const sStep = parseInt(s.dataset.step);
            s.classList.remove('active', 'completed');
            if (sStep === step) s.classList.add('active');
            else if (sStep < step) s.classList.add('completed');
        });

        progressFill.style.width = (step / totalSteps * 100) + '%';

        prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
        if (step === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }

    nextBtn.addEventListener('click', () => {
        // Simple validation for current step
        const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepEl.querySelectorAll('[required]');
        let valid = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                field.style.borderColor = 'var(--accent-secondary)';
                valid = false;
                setTimeout(() => { field.style.borderColor = ''; }, 2000);
            }
        });

        if (valid && currentStep < totalSteps) {
            currentStep++;
            updateStep(currentStep);
            document.getElementById('advisor').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStep(currentStep);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userProfile = collectFormData();
        startAnalysis(userProfile);
    });
}


function collectFormData() {
    const interests = [];
    document.querySelectorAll('input[name="interest"]:checked').forEach(cb => {
        interests.push(cb.value);
    });

    return {
        fullName: document.getElementById('fullName').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        category: document.getElementById('category').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        disability: document.getElementById('disability').value,
        occupation: document.getElementById('occupation').value,
        annualIncome: document.getElementById('annualIncome').value,
        education: document.getElementById('education').value,
        bplCard: document.getElementById('bplCard').value,
        landOwnership: document.getElementById('landOwnership').value,
        housing: document.getElementById('housing').value,
        state: document.getElementById('state').value,
        district: document.getElementById('district').value,
        areaType: document.getElementById('areaType').value,
        bankAccount: document.getElementById('bankAccount').value,
        aadhaar: document.getElementById('aadhaar').value,
        rationCard: document.getElementById('rationCard').value,
        children: document.getElementById('children').value,
        interests: interests
    };
}


// Analysis Animation
function startAnalysis(userProfile) {
    const advisorSection = document.getElementById('advisor');
    const analysisSection = document.getElementById('analysisSection');
    const analysisText = document.getElementById('analysisText');
    const analysisBar = document.getElementById('analysisBar');

    advisorSection.style.display = 'none';
    analysisSection.style.display = 'block';
    analysisSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const messages = [
        'Scanning Central Government Schemes...',
        'Checking State-specific Programs...',
        'Matching occupation & income criteria...',
        'Analyzing age & category eligibility...',
        'Calculating eligibility scores...',
        'Ranking best matches for you...',
        'Preparing your personalized report...'
    ];

    let progress = 0;
    let msgIndex = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                const results = findEligibleSchemes(userProfile);
                showResults(userProfile, results);
            }, 500);
        }

        analysisBar.style.width = progress + '%';

        if (msgIndex < messages.length && progress > (msgIndex + 1) * (100 / messages.length)) {
            analysisText.textContent = messages[msgIndex];
            msgIndex++;
        }
    }, 300);
}


// Show Results
function showResults(userProfile, schemes) {
    const analysisSection = document.getElementById('analysisSection');
    const resultsSection = document.getElementById('resultsSection');

    analysisSection.style.display = 'none';
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update count
    document.getElementById('schemeCount').textContent = schemes.length;

    // Summary
    const highMatch = schemes.filter(s => s.scoreLevel === 'high').length;
    document.getElementById('resultsSummary').textContent =
        `Based on your profile, we found ${schemes.length} eligible schemes including ${highMatch} high-match recommendations.`;

    // Profile Summary
    renderProfileSummary(userProfile);

    // Render scheme cards
    renderSchemes(schemes, 'all');

    // Filter tabs
    initFilterTabs(schemes);

    // New Search button
    document.getElementById('newSearchBtn').onclick = () => {
        resultsSection.style.display = 'none';
        document.getElementById('advisor').style.display = 'block';
        document.getElementById('advisor').scrollIntoView({ behavior: 'smooth' });
    };

    // Print button
    document.getElementById('printBtn').onclick = () => window.print();

    // Store for modal
    window.__schemes = schemes;
}


function renderProfileSummary(profile) {
    const container = document.getElementById('profileSummary');
    const tags = [
        { icon: '👤', text: profile.fullName },
        { icon: '🎂', text: `Age: ${profile.age}` },
        { icon: '⚧', text: capitalize(profile.gender) },
        { icon: '📋', text: profile.category.toUpperCase() },
        { icon: '💼', text: capitalize(profile.occupation.replace('-', ' ')) },
        { icon: '💰', text: `₹${parseInt(profile.annualIncome).toLocaleString('en-IN')}/year` },
        { icon: '📍', text: capitalize(profile.state.replace(/-/g, ' ')) },
        { icon: '🏘️', text: capitalize(profile.areaType) }
    ];

    container.innerHTML = tags.map(t =>
        `<span class="profile-tag">${t.icon} ${t.text}</span>`
    ).join('');
}


function renderSchemes(schemes, filter) {
    const grid = document.getElementById('schemesGrid');
    let filtered = schemes;

    if (filter === 'central') filtered = schemes.filter(s => s.type === 'central');
    else if (filter === 'state') filtered = schemes.filter(s => s.type === 'state');
    else if (filter === 'high') filtered = schemes.filter(s => s.scoreLevel === 'high');

    grid.innerHTML = filtered.map((scheme, index) => `
        <div class="scheme-card" data-scheme-id="${scheme.id}" style="animation-delay: ${index * 0.08}s" onclick="openSchemeModal('${scheme.id}')">
            <div class="scheme-card-header">
                <span class="scheme-type-badge ${scheme.type}">${scheme.type === 'central' ? 'Central Govt' : 'State Govt'}</span>
                <span class="eligibility-badge ${scheme.scoreLevel}">${scheme.eligibilityScore}% Match</span>
            </div>
            <h3>${scheme.icon} ${scheme.name}</h3>
            <p class="scheme-ministry">${scheme.ministry}</p>
            <p class="scheme-desc">${scheme.description}</p>
            <div class="scheme-benefits">
                ${scheme.benefits.slice(0, 3).map(b => `<span class="benefit-tag">✦ ${b}</span>`).join('')}
            </div>
            <div class="eligibility-bar-wrapper">
                <div class="eligibility-bar-label">
                    <span>Eligibility Score</span>
                    <span>${scheme.eligibilityScore}%</span>
                </div>
                <div class="eligibility-bar">
                    <div class="eligibility-bar-fill ${scheme.scoreLevel}" style="width: ${scheme.eligibilityScore}%"></div>
                </div>
            </div>
            <div class="scheme-card-footer">
                <span class="scheme-reason">💡 ${scheme.matchReasons[0]}</span>
                <span class="view-details-btn">Details →</span>
            </div>
        </div>
    `).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.2rem; color: var(--text-tertiary); margin-bottom: 8px;">No schemes found for this filter</p>
                <p style="color: var(--text-muted);">Try selecting "All Schemes" to see all matches.</p>
            </div>
        `;
    }
}


function initFilterTabs(schemes) {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderSchemes(schemes, tab.dataset.filter);
        });
    });
}


// Scheme Detail Modal
function openSchemeModal(schemeId) {
    const scheme = window.__schemes.find(s => s.id === schemeId);
    if (!scheme) return;

    const modal = document.getElementById('schemeModal');
    const body = document.getElementById('modalBody');

    body.innerHTML = `
        <div class="modal-header">
            <span class="scheme-type-badge ${scheme.type}">${scheme.type === 'central' ? 'Central Government' : 'State Government'}</span>
            <h2>${scheme.icon} ${scheme.name}</h2>
            <p class="ministry">${scheme.ministry}</p>
        </div>

        <div class="modal-score">
            <div class="modal-score-circle ${scheme.scoreLevel}">${scheme.eligibilityScore}%</div>
            <div class="modal-score-text">
                <h4>Eligibility Score: ${scheme.scoreLevel === 'high' ? 'Highly Eligible' : scheme.scoreLevel === 'medium' ? 'Moderately Eligible' : 'Partially Eligible'}</h4>
                <p>${scheme.matchReasons.join(' • ')}</p>
            </div>
        </div>

        <div class="modal-section">
            <h3>📋 About This Scheme</h3>
            <p>${scheme.description}</p>
        </div>

        <div class="modal-section">
            <h3>🎁 Key Benefits</h3>
            <ul>
                ${scheme.benefits.map(b => `<li>${b}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>💡 Why You're Eligible</h3>
            <p>${scheme.whyEligible}</p>
        </div>

        <div class="modal-section">
            <h3>📝 Required Documents</h3>
            <ul>
                ${scheme.eligibility.documents.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>🚀 How to Apply</h3>
            <p>${scheme.howToApply}</p>
        </div>

        <a href="${scheme.applicationLink}" target="_blank" rel="noopener noreferrer" class="modal-apply-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Apply on Official Portal
        </a>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.openSchemeModal = openSchemeModal;

function initModalHandlers() {
    const modal = document.getElementById('schemeModal');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


// Mobile Menu
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}


// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


// Utility
function capitalize(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}


// Scroll-based header effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(5, 8, 16, 0.95)';
        header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.background = 'rgba(5, 8, 16, 0.8)';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});


// Intersection Observer for feature cards
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    featureObserver.observe(card);
});
