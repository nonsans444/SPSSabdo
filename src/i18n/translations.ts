import { Language, EvaluationLevel } from '../types';

export interface Translations {
  appName: string;
  appFullName: string;
  appTagline: string;
  teacherFormTitle: string;
  teacherFormSubtitle: string;
  teacherName: string;
  teacherNamePlaceholder: string;
  schoolName: string;
  schoolNamePlaceholder: string;
  className: string;
  classNamePlaceholder: string;
  totalStudents: string;
  totalStudentsPlaceholder: string;
  readersCount: string;
  readersCountPlaceholder: string;
  nonReadersCount: string;
  nonReadersCountPlaceholder: string;
  autoCalculatedHint: string;
  optional: string;
  calculateBtn: string;
  resetBtn: string;
  resultsSectionTitle: string;
  calculatePrompt: string;
  readerPercentage: string;
  nonReaderPercentage: string;
  gradeOutOf20: string;
  evaluationLevel: string;
  levelExcellent: string;
  levelGood: string;
  levelNeedsEncouragement: string;
  levelLow: string;
  levelDescExcellent: string;
  levelDescGood: string;
  levelDescNeedsEncouragement: string;
  levelDescLow: string;
  // Validation errors
  errTotalRequired: string;
  errReadersRequired: string;
  errTotalPositive: string;
  errWholeNumbers: string;
  errReadersExceedTotal: (readers: number, total: number) => string;
  errNonReadersExceedTotal: (nonReaders: number, total: number) => string;
  errSumMismatch: (readers: number, nonReaders: number, sum: number, total: number) => string;
  // Report
  reportsAreaTitle: string;
  reportsAreaSubtitle: string;
  printFullReportBtn: string;
  printPdfNote: string;
  republicTitle: string;
  ministryTitle: string;
  directorateTitle: string;
  pedagogicalReportHeading: string;
  academicYearLabel: string;
  dateLabel: string;
  inspectorSignature: string;
  principalSignature: string;
  teacherSignature: string;
  pedagogicalObservations: string;
  pedagogicalRecommendation: string;
  lightMode: string;
  darkMode: string;
  ratioComparison: string;
  readersLabel: string;
  nonReadersLabel: string;
  totalLabel: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: "SPSS",
    appFullName: "نظام إحصاء شغف المطالعة لدى التلاميذ",
    appTagline: "منظومة إحصائية وتربوية لحساب معدلات وعلامات شغف القراءة وإعداد التقارير البيداغوجية",
    teacherFormTitle: "بيانات القسم وتقييم المطالعة",
    teacherFormSubtitle: "أدخل معطيات القسم ثم اضغط على زر 'حساب الإحصائيات' لحساب العلامة وإعداد التقرير",
    teacherName: "اسم الأستاذ(ة)",
    teacherNamePlaceholder: "مثال: أ. بن علي",
    schoolName: "المؤسسة التعليمية",
    schoolNamePlaceholder: "مثال: متوسطة الأمير عبد القادر",
    className: "القسم / المستوى",
    classNamePlaceholder: "مثال: 3م2 أو 1ع1 أو 4اب",
    totalStudents: "العدد الإجمالي للتلاميذ",
    totalStudentsPlaceholder: "مثال: 30",
    readersCount: "عدد التلاميذ المحبين للمطالعة",
    readersCountPlaceholder: "مثال: 21",
    nonReadersCount: "عدد التلاميذ غير المهتمين بالمطالعة",
    nonReadersCountPlaceholder: "يُحسب تلقائياً إذا تُرِك فارغاً (مثال: 9)",
    autoCalculatedHint: "يُحسب تلقائياً (المجموع - المطالعين)",
    optional: "اختياري",
    calculateBtn: "حساب الإحصائيات",
    resetBtn: "تفريغ الحقول",
    resultsSectionTitle: "نتائج الإحصائيات والعلامة التقديرية",
    calculatePrompt: "أدخل معطيات القسم بالأعلى ثم اضغط على 'حساب الإحصائيات' لعرض النتائج والتقرير.",
    readerPercentage: "نسبة محبي المطالعة",
    nonReaderPercentage: "نسبة غير المطالعين",
    gradeOutOf20: "العلامة من 20",
    evaluationLevel: "التقدير البيداغوجي",
    levelExcellent: "ممتاز",
    levelGood: "جيد",
    levelNeedsEncouragement: "يحتاج إلى تشجيع",
    levelLow: "ضعيف",
    levelDescExcellent: "شغف استثنائي بالمطالعة (75% فما فوق) يستحق التكريم ومواصلة التحفيز.",
    levelDescGood: "مستوى إيجابي يظهر اهتماماً جيداً بالكتب والقراءة (50% إلى 74%).",
    levelDescNeedsEncouragement: "يحتاج الفوج إلى تشجيع وتفعيل الأنشطة القرائية والمكتبية (25% إلى 49%).",
    levelDescLow: "مستوى منخفض (أقل من 25%) يتطلب تدخلاً بيداغوجياً عاجلاً ومشاريع قراءة موجهة.",
    errTotalRequired: "يُرجى إدخال العدد الإجمالي للتلاميذ.",
    errReadersRequired: "يُرجى إدخال عدد التلاميذ المحبين للمطالعة.",
    errTotalPositive: "يجب أن يكون العدد الإجمالي للتلاميذ أكبر من الصفر.",
    errWholeNumbers: "جميع الأعداد يجب أن تكون أعداداً صحيحة طبيعية (0 فما فوق).",
    errReadersExceedTotal: (readers, total) => `عدد المطالعين (${readers}) أكبر من إجمالي التلاميذ (${total}). يُرجى التحقق من الأعداد.`,
    errNonReadersExceedTotal: (nonReaders, total) => `عدد غير المطالعين (${nonReaders}) أكبر من إجمالي التلاميذ (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `مجموع المطالعين (${readers}) وغير المطالعين (${nonReaders}) هو ${sum}، وهو لا يساوي المجموع الكلي (${total}).`,
    reportsAreaTitle: "التقرير البيداغوجي الرسمي",
    reportsAreaSubtitle: "وثيقة تربوية رسمية متوافقة مع معايير وزارة التربية الوطنية وجاهزة للطباعة أو الحفظ كـ PDF",
    printFullReportBtn: "طباعة التقرير الكامل",
    printPdfNote: "💡 في نافذة الطباعة المنبثقة، يمكنك اختيار 'حفظ بتنسيق PDF' (Save as PDF) لحفظ نسخة إلكترونية من التقرير على جهازك.",
    republicTitle: "الجمهورية الجزائرية الديمقراطية الشعبية",
    ministryTitle: "وزارة التربية الوطنية",
    directorateTitle: "مديرية التربية لولاية",
    pedagogicalReportHeading: "تقرير بيداغوجي إحصائي حول واقع شغف المطالعة المدرسية",
    academicYearLabel: "السنة الدراسية: 2025 / 2026",
    dateLabel: "تاريخ إعداد التقرير:",
    inspectorSignature: "تأشيرة السيد(ة) مفتش(ة) التعليم",
    principalSignature: "موافقة السيد(ة) مدير(ة) المؤسسة",
    teacherSignature: "إمضاء الأستاذ(ة) المشرف(ة)",
    pedagogicalObservations: "الملاحظات البيداغوجية والتوجيهات القرائية",
    pedagogicalRecommendation: "يوصى بتكثيف نوادي القراءة، تنظيم مسابقات 'تحدي القراءة العربي'، وإدراج حصة مطالعة حرة أسبوعية في رزنامة الأنشطة الصفية.",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    ratioComparison: "المقارنة النسبية بين المجموعتين",
    readersLabel: "محبو المطالعة",
    nonReadersLabel: "غير المهتمين بالمطالعة",
    totalLabel: "المجموع الكلي",
  },
  fr: {
    appName: "SPSS",
    appFullName: "Système de Statistiques de la Passion de la Lecture des Élèves",
    appTagline: "Outil pédagogique statistique pour calculer la note sur 20 et générer le rapport officiel",
    teacherFormTitle: "Données de la Classe & Évaluation de Lecture",
    teacherFormSubtitle: "Saisissez les effectifs puis cliquez sur 'Calculer les statistiques' pour afficher les résultats",
    teacherName: "Nom de l'Enseignant(e)",
    teacherNamePlaceholder: "Ex: M. Benali",
    schoolName: "Établissement Scolaire",
    schoolNamePlaceholder: "Ex: CEM Émir Abdelkader",
    className: "Classe / Division",
    classNamePlaceholder: "Ex: 3AM2, 1AS1, 5AP",
    totalStudents: "Effectif Total des Élèves",
    totalStudentsPlaceholder: "Ex: 30",
    readersCount: "Élèves passionnés de lecture",
    readersCountPlaceholder: "Ex: 21",
    nonReadersCount: "Élèves non lecteurs",
    nonReadersCountPlaceholder: "Calculé automatiquement si vide (Ex: 9)",
    autoCalculatedHint: "Calculé automatiquement (Total - Lecteurs)",
    optional: "optionnel",
    calculateBtn: "Calculer les statistiques",
    resetBtn: "Réinitialiser",
    resultsSectionTitle: "Résultats Statistiques & Note Pédagogique",
    calculatePrompt: "Renseignez les effectifs ci-dessus puis cliquez sur 'Calculer les statistiques'.",
    readerPercentage: "Pourcentage de Lecteurs",
    nonReaderPercentage: "Pourcentage de Non-Lecteurs",
    gradeOutOf20: "Note sur 20",
    evaluationLevel: "Appréciation",
    levelExcellent: "Excellent",
    levelGood: "Bien",
    levelNeedsEncouragement: "À encourager",
    levelLow: "Faible",
    levelDescExcellent: "Forte passion pour la lecture (75% et plus), à féliciter et valoriser.",
    levelDescGood: "Niveau positif témoignant d'un intérêt réel pour le livre (50% à 74%).",
    levelDescNeedsEncouragement: "Nécessite des séances d'encouragement et l'accès régulier à la bibliothèque (25% à 49%).",
    levelDescLow: "Niveau faible (moins de 25%) nécessitant un plan d'action d'urgence et des lectures guidées.",
    errTotalRequired: "Veuillez renseigner l'effectif total.",
    errReadersRequired: "Veuillez renseigner le nombre d'élèves lecteurs.",
    errTotalPositive: "L'effectif total doit être supérieur à zéro.",
    errWholeNumbers: "Tous les effectifs doivent être des nombres entiers positifs ou nuls.",
    errReadersExceedTotal: (readers, total) => `Le nombre de lecteurs (${readers}) dépasse l'effectif total (${total}). Vérifiez les nombres.`,
    errNonReadersExceedTotal: (nonReaders, total) => `Le nombre de non-lecteurs (${nonReaders}) dépasse l'effectif total (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `La somme lecteurs (${readers}) + non-lecteurs (${nonReaders}) est ${sum}, différente du total (${total}).`,
    reportsAreaTitle: "Rapport Pédagogique Officiel",
    reportsAreaSubtitle: "Document officiel conforme aux normes du Ministère de l'Éducation Nationale, prêt à imprimer",
    printFullReportBtn: "Imprimer le rapport complet",
    printPdfNote: "💡 Dans la boîte de dialogue d'impression, vous pouvez choisir 'Enregistrer au format PDF' pour sauvegarder le fichier sur votre appareil.",
    republicTitle: "République Algérienne Démocratique et Populaire",
    ministryTitle: "Ministère de l'Éducation Nationale",
    directorateTitle: "Direction de l'Éducation de la Wilaya",
    pedagogicalReportHeading: "Rapport Statistique sur les Pratiques de Lecture en Milieu Scolaire",
    academicYearLabel: "Année Scolaire : 2025 / 2026",
    dateLabel: "Date du rapport :",
    inspectorSignature: "Visa de l'Inspecteur(trice) Pédagogique",
    principalSignature: "Visa du Chef d'Établissement",
    teacherSignature: "Signature de l'Enseignant(e)",
    pedagogicalObservations: "Constats et Recommandations Pédagogiques",
    pedagogicalRecommendation: "Il est préconisé d'animer des clubs de lecture, de motiver la participation au Défi de la Lecture Arabe, et d'instituer un quart d'heure de lecture régulier.",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    ratioComparison: "Comparaison des deux groupes",
    readersLabel: "Élèves Lecteurs",
    nonReadersLabel: "Élèves Non-Lecteurs",
    totalLabel: "Effectif Total",
  },
  en: {
    appName: "SPSS",
    appFullName: "Students' Passion for reading Statistics System",
    appTagline: "Educational statistics system calculating reading grades out of 20 and generating official reports",
    teacherFormTitle: "Class Information & Reading Assessment",
    teacherFormSubtitle: "Enter the student counts and click 'Calculate Statistics' to generate results and the report",
    teacherName: "Teacher Name",
    teacherNamePlaceholder: "e.g., Mr. Benali",
    schoolName: "School Name",
    schoolNamePlaceholder: "e.g., Emir Abdelkader Middle School",
    className: "Class / Division",
    classNamePlaceholder: "e.g., 3AM2, 1AS1, 5AP",
    totalStudents: "Total Number of Students",
    totalStudentsPlaceholder: "e.g., 30",
    readersCount: "Number Who Like Reading",
    readersCountPlaceholder: "e.g., 21",
    nonReadersCount: "Number Who Do Not Like Reading",
    nonReadersCountPlaceholder: "Auto-calculated if left blank (e.g., 9)",
    autoCalculatedHint: "Auto-calculated (Total - Readers)",
    optional: "optional",
    calculateBtn: "Calculate Statistics",
    resetBtn: "Clear Fields",
    resultsSectionTitle: "Statistical Results & Pedagogical Grade",
    calculatePrompt: "Enter class counts above and press 'Calculate Statistics' to view the results and report.",
    readerPercentage: "Readers Percentage",
    nonReaderPercentage: "Non-Readers Percentage",
    gradeOutOf20: "Grade out of 20",
    evaluationLevel: "Level / Appraisal",
    levelExcellent: "Excellent",
    levelGood: "Good",
    levelNeedsEncouragement: "Needs Encouragement",
    levelLow: "Low",
    levelDescExcellent: "Exceptional reading enthusiasm (75% and above), deserves commendation and rewards.",
    levelDescGood: "Positive engagement showing genuine interest in books (50% to 74%).",
    levelDescNeedsEncouragement: "Requires reading promotion and active school library engagement (25% to 49%).",
    levelDescLow: "Low engagement (below 25%), urgent pedagogical reading intervention and guided projects needed.",
    errTotalRequired: "Please enter the total number of students.",
    errReadersRequired: "Please enter the number of reading students.",
    errTotalPositive: "Total number of students must be greater than zero.",
    errWholeNumbers: "All numbers must be whole positive integers (0 or greater).",
    errReadersExceedTotal: (readers, total) => `Readers (${readers}) exceed the total (${total}). Check the numbers.`,
    errNonReadersExceedTotal: (nonReaders, total) => `Non-readers (${nonReaders}) exceed the total (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `The sum of readers (${readers}) and non-readers (${nonReaders}) is ${sum}, which does not match total (${total}).`,
    reportsAreaTitle: "Official Pedagogical Report",
    reportsAreaSubtitle: "Official pedagogical document compliant with Algerian Ministry standards, ready to print or save as PDF",
    printFullReportBtn: "Print Full Report",
    printPdfNote: "💡 In the print dialog, select 'Save as PDF' to save an electronic file directly to your device.",
    republicTitle: "People's Democratic Republic of Algeria",
    ministryTitle: "Ministry of National Education",
    directorateTitle: "Directorate of Education",
    pedagogicalReportHeading: "Pedagogical Statistical Report on School Reading Practices",
    academicYearLabel: "Academic Year: 2025 / 2026",
    dateLabel: "Report Date:",
    inspectorSignature: "Pedagogical Inspector Visa",
    principalSignature: "School Principal Visa",
    teacherSignature: "Teacher-in-Charge Signature",
    pedagogicalObservations: "Pedagogical Observations & Recommendations",
    pedagogicalRecommendation: "Recommended actions include book clubs, Arab Reading Challenge mobilization, and scheduled weekly silent reading periods in classrooms.",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    ratioComparison: "Comparative Group Breakdown",
    readersLabel: "Readers",
    nonReadersLabel: "Non-Readers",
    totalLabel: "Total Students",
  }
};
