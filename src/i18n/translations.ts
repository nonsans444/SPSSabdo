import { Language, EvaluationLevel } from '../types';

export interface Translations {
  appName: string;
  appFullName: string;
  appTagline: string;
  navCalculator: string;
  navRecords: string;
  navReport: string;
  teacherFormTitle: string;
  teacherFormSubtitle: string;
  teacherName: string;
  teacherNamePlaceholder: string;
  schoolName: string;
  schoolNamePlaceholder: string;
  schoolNameGhostHint: string;
  className: string;
  classNamePlaceholder: string;
  selectSpecialtyLabel: string;
  customSpecialtyLabel: string;
  totalStudents: string;
  totalStudentsPlaceholder: string;
  readersCount: string;
  readersCountPlaceholder: string;
  nonReadersCount: string;
  nonReadersCountPlaceholder: string;
  autoCalculatedHint: string;
  optional: string;
  saveClassBtn: string;
  updateClassBtn: string;
  resetBtn: string;
  sampleClassesBtn: string;
  liveStatsTitle: string;
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
  errTotalPositive: string;
  errWholeNumbers: string;
  errReadersExceedTotal: (readers: number, total: number) => string;
  errNonReadersExceedTotal: (nonReaders: number, total: number) => string;
  errSumMismatch: (readers: number, nonReaders: number, sum: number, total: number) => string;
  errClassNameRequired: string;
  // Records
  recordsTitle: string;
  recordsSubtitle: string;
  emptyRecordsTitle: string;
  emptyRecordsDesc: string;
  startFirstEvaluationBtn: string;
  overallStatsTitle: string;
  totalClassesLabel: string;
  totalStudentsLabel: string;
  totalReadersLabel: string;
  totalNonReadersLabel: string;
  overallPercentageLabel: string;
  averageGradeLabel: string;
  bestClassLabel: string;
  needsSupportClassLabel: string;
  noDataYet: string;
  searchPlaceholder: string;
  filterAll: string;
  confirmDeleteTitle: string;
  confirmDeleteDesc: (className: string) => string;
  confirmDeleteAllTitle: string;
  confirmDeleteAllDesc: string;
  deleteBtn: string;
  cancelBtn: string;
  exportJsonBtn: string;
  importJsonBtn: string;
  clearAllBtn: string;
  savedSuccessToast: string;
  updatedSuccessToast: string;
  deletedSuccessToast: string;
  // Report
  reportTitle: string;
  reportSubtitle: string;
  printBtn: string;
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
  comparisonChartTitle: string;
  lightMode: string;
  darkMode: string;
  systemReady: string;
  ratioComparison: string;
  readersLabel: string;
  nonReadersLabel: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: "SPSS",
    appFullName: "نظام الحساب والتحليل الإحصائي الأكاديمي العام",
    appTagline: "منظومة إحصائية متطورة لحساب النسب المئوية، المؤشرات العامة، والعلامات التقديرية",
    navCalculator: "حاسبة الإحصائيات",
    navRecords: "سجل الإحصائيات والتخصصات",
    navReport: "التقرير الإحصائي (طباعة)",
    teacherFormTitle: "بيانات التخصص والحساب الإحصائي العام",
    teacherFormSubtitle: "أدخل الأعداد والمعطيات الإحصائية للحصول الفوري على النسب المئوية، الرسوم البيانية، والعلامة من 20",
    teacherName: "الأستاذ(ة) المشرف / المحاضر",
    teacherNamePlaceholder: "مثال: د. الأستاذ المشرف",
    schoolName: "الجامعة / المركز الجامعي",
    schoolNamePlaceholder: "جامعة الجزائر (مثال)",
    schoolNameGhostHint: "مثال افتراضي ضبابي - لا يلزمك مسحه، يمكنك الكتابة فوقه مباشرة",
    className: "التخصص الجامعي / الفئة",
    classNamePlaceholder: "اختر أو اكتب التخصص أو الفئة الإحصائية...",
    selectSpecialtyLabel: "قائمة التخصصات الجامعية المعتمدة بالجزائر",
    customSpecialtyLabel: "أو اكتب تخصصاً أو فئة مخصصة",
    totalStudents: "العدد الإجمالي (عينة الدراسة / المجموع الكلي N)",
    totalStudentsPlaceholder: "مثال: 45",
    readersCount: "العدد المحقق / الحالات الإيجابية (الفئة الأولى n1)",
    readersCountPlaceholder: "عدد المستجيبين / المحققين للشرط",
    nonReadersCount: "العدد المتبقي / الحالات المقابلة (الفئة الثانية n2)",
    nonReadersCountPlaceholder: "يُحسب تلقائياً إذا تُرِك فارغاً",
    autoCalculatedHint: "يحسب تلقائياً بناءً على المجموع الكلي",
    optional: "اختياري",
    saveClassBtn: "حفظ في السجل الإحصائي",
    updateClassBtn: "تحديث البيانات الإحصائية",
    resetBtn: "تفريغ الحقول",
    sampleClassesBtn: "تحميل نماذج إحصائية",
    liveStatsTitle: "المؤشرات الإحصائية الفورية",
    readerPercentage: "النسبة المئوية للفئة الأولى %",
    nonReaderPercentage: "النسبة المئوية للفئة الثانية %",
    gradeOutOf20: "العلامة التقديرية الإحصائية",
    evaluationLevel: "التقدير الإحصائي العام",
    levelExcellent: "مرتفع جداً (أداء استثنائي)",
    levelGood: "مرتفع (أداء إيجابي)",
    levelNeedsEncouragement: "متوسط (مؤشر معتدل)",
    levelLow: "منخفض (يتطلب تدخلاً ومعالجة)",
    levelDescExcellent: "مؤشر إحصائي ممتاز يعكس كفاءة استثنائية ونسبة تحقيق عالية تتجاوز المعايير المستهدفة.",
    levelDescGood: "مؤشر إحصائي إيجابي يظهر اتجاهاً عاماً مستقراً ونسب نجاح جيدة.",
    levelDescNeedsEncouragement: "المؤشر الإحصائي متوسط، يوصى بدراسة المتغيرات لتحسين نسب الإنجاز والتفاعل.",
    levelDescLow: "المؤشر الإحصائي منخفض، يتطلب خطة تدخل ومعالجة الأسباب المعيقة للتحقيق.",
    errTotalPositive: "يجب أن يكون المجموع الإجمالي أكبر من الصفر.",
    errWholeNumbers: "جميع الأعداد الإحصائية يجب أن تكون أعداداً صحيحة طبيعية (0 فما فوق).",
    errReadersExceedTotal: (readers, total) => `عدد الفئة الأولى (${readers}) أكبر من المجموع الكلي (${total}). يُرجى التحقق.`,
    errNonReadersExceedTotal: (nonReaders, total) => `عدد الفئة المقابلة (${nonReaders}) أكبر من المجموع الكلي (${total}). يُرجى التحقق.`,
    errSumMismatch: (readers, nonReaders, sum, total) => `مجموع الفئتين (${readers} + ${nonReaders} = ${sum}) لا يساوي المجموع الكلي (${total}).`,
    errClassNameRequired: "يُرجى اختيار أو إدخال اسم التخصص أو الفئة الإحصائية.",
    recordsTitle: "سجل الإحصائيات والتخصصات المسجلة",
    recordsSubtitle: "قاعدة بيانات المؤشرات الإحصائية العامة، النسب المئوية، والمقارنات البيانية",
    emptyRecordsTitle: "لا توجد سجلات إحصائية حتى الآن",
    emptyRecordsDesc: "قم بإدخال بياناتك الإحصائية الأولى في الحاسبة أو حمّل نماذج تجريبية للمعاينة الفورية.",
    startFirstEvaluationBtn: "تسجيل أول حساب إحصائي",
    overallStatsTitle: "المؤشرات الإحصائية المجمّعة لكافة التخصصات",
    totalClassesLabel: "عدد التخصصات",
    totalStudentsLabel: "المجموع الكلي للحالات",
    totalReadersLabel: "إجمالي الفئة الأولى",
    totalNonReadersLabel: "إجمالي الفئة المقابلة",
    overallPercentageLabel: "المؤشر الإحصائي العام المجمّع",
    averageGradeLabel: "المعدل الحسابي العام للعلامات",
    bestClassLabel: "التخصص الأعلى في المؤشر الإحصائي",
    needsSupportClassLabel: "التخصص الأقل في المؤشر الإحصائي",
    noDataYet: "لا توجد معطيات",
    searchPlaceholder: "البحث عن تخصص أو مؤشر إحصائي...",
    filterAll: "جميع التقديرات",
    confirmDeleteTitle: "تأكيد حذف السجل الإحصائي",
    confirmDeleteDesc: (className) => `هل أنت متأكد من حذف المؤشرات الإحصائية للتخصص "${className}" نهائياً؟`,
    confirmDeleteAllTitle: "تأكيد مسح كافة السجلات الإحصائية",
    confirmDeleteAllDesc: "سيتم حذف جميع السجلات الإحصائية المحفوظة نهائياً من هذا المتصفح.",
    deleteBtn: "حذف",
    cancelBtn: "إلغاء",
    exportJsonBtn: "تصدير نسخة احتياطية (JSON)",
    importJsonBtn: "استيراد ملف (JSON)",
    clearAllBtn: "مسح جميع السجلات",
    savedSuccessToast: "تم حفظ المؤشرات الإحصائية للتخصص بنجاح في السجل!",
    updatedSuccessToast: "تم تحديث البيانات الإحصائية بنجاح!",
    deletedSuccessToast: "تم حذف السجل الإحصائي بنجاح.",
    reportTitle: "التقرير الإحصائي التحليلي الموحد",
    reportSubtitle: "وثيقة إحصائية وبيداغوجية رسمية معتمدة جاهزة للطباعة والتسليم للعمادة والمجالس العلمية",
    printBtn: "طباعة التقرير / حفظ كـ PDF",
    republicTitle: "الجمهورية الجزائرية الديمقراطية الشعبية",
    ministryTitle: "وزارة التعليم العالي والبحث العلمي",
    directorateTitle: "الجامعة / الكلية:",
    pedagogicalReportHeading: "تقرير إحصائي تحليلي شامل حول المؤشرات الأكاديمية والنسب المئوية العامة",
    academicYearLabel: "السنة الجامعية: 2025 / 2026",
    dateLabel: "تاريخ إعداد التقرير:",
    inspectorSignature: "تأشيرة رئيس المجلس العلمي للكلية",
    principalSignature: "موافقة السيد(ة) عميد الكلية / مدير المعهد",
    teacherSignature: "إمضاء الأستاذ(ة) المشرف(ة) / المحاضر",
    pedagogicalObservations: "الملاحظات الإحصائية والتوصيات العامة",
    pedagogicalRecommendation: "يوصى بالاعتماد على التحليل الإحصائي المستمر لتطوير الأداء الأكاديمي، تعميم المقارنات الرقمية المنهجية، وضبط برامج الدعم استناداً إلى المؤشرات المحسوبة.",
    comparisonChartTitle: "مقارنة النسب والمؤشرات الإحصائية بين التخصصات المختلفة",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    systemReady: "جاهز ومحدّث",
    ratioComparison: "المقارنة النسبية بين الفئتين الإحصائيتين",
    readersLabel: "الفئة الأولى (المحققة)",
    nonReadersLabel: "الفئة المقابلة (المتبقية)",
  },
  fr: {
    appName: "SPSS",
    appFullName: "Système de Calcul et d'Analyses Statistiques Générales",
    appTagline: "Plateforme statistique pour le calcul des pourcentages, ratios et indicateurs académiques",
    navCalculator: "Calculateur Statistique",
    navRecords: "Registres & Statistiques",
    navReport: "Rapport Statistique (PDF)",
    teacherFormTitle: "Données de la Filière & Calcul Statistique Général",
    teacherFormSubtitle: "Saisissez les effectifs et données pour obtenir instantanément les pourcentages, graphiques et la note sur 20",
    teacherName: "Enseignant(e) Référent / Maître de Conférences",
    teacherNamePlaceholder: "Ex: Dr. / Enseignant Référent",
    schoolName: "Université / Centre Universitaire",
    schoolNamePlaceholder: "Université d'Alger (Exemple)",
    schoolNameGhostHint: "Exemple indicatif estompé - Inutile d'effacer, saisissez directement votre établissement",
    className: "Filière / Spécialité Universitaire",
    classNamePlaceholder: "Choisir ou saisir une spécialité...",
    selectSpecialtyLabel: "Spécialités universitaires algériennes",
    customSpecialtyLabel: "Ou saisir une spécialité personnalisée",
    totalStudents: "Effectif Total (Population N)",
    totalStudentsPlaceholder: "Ex: 45",
    readersCount: "Effectif Validé / Groupe 1 (n1)",
    readersCountPlaceholder: "Nombre de cas positifs / validés",
    nonReadersCount: "Effectif Complémentaire / Groupe 2 (n2)",
    nonReadersCountPlaceholder: "Calculé automatiquement si vide",
    autoCalculatedHint: "Calculé automatiquement à partir du total",
    optional: "optionnel",
    saveClassBtn: "Enregistrer dans le Registre",
    updateClassBtn: "Mettre à jour les données",
    resetBtn: "Réinitialiser",
    sampleClassesBtn: "Charger exemples statistiques",
    liveStatsTitle: "Indicateurs Statistiques Instantanés",
    readerPercentage: "Pourcentage Groupe 1 (Taux Validé)",
    nonReaderPercentage: "Pourcentage Groupe 2 (Taux Complémentaire)",
    gradeOutOf20: "Note d'Évaluation sur 20",
    evaluationLevel: "Appréciation Statistique",
    levelExcellent: "Très Élevé (Remarquable)",
    levelGood: "Élevé (Satisfaisant)",
    levelNeedsEncouragement: "Moyen (Modéré)",
    levelLow: "Faible (Action requise)",
    levelDescExcellent: "Indicateur statistique remarquable, taux de réussite largement supérieur aux moyennes.",
    levelDescGood: "Indicateur statistique positif attestant d'une bonne stabilité des résultats.",
    levelDescNeedsEncouragement: "Indicateur modéré, nécessite une analyse des facteurs déterminants pour rehausser les ratios.",
    levelDescLow: "Indicateur faible, justifiant un plan d'action d'urgence et un suivi méthodologique.",
    errTotalPositive: "L'effectif total doit être supérieur à zéro.",
    errWholeNumbers: "Tous les effectifs doivent être des entiers positifs ou nuls.",
    errReadersExceedTotal: (readers, total) => `L'effectif du groupe 1 (${readers}) dépasse le total (${total}).`,
    errNonReadersExceedTotal: (nonReaders, total) => `L'effectif du groupe 2 (${nonReaders}) dépasse le total (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `La somme groupe 1 (${readers}) + groupe 2 (${nonReaders}) est ${sum}, différente du total (${total}).`,
    errClassNameRequired: "Veuillez sélectionner ou saisir une spécialité universitaire.",
    recordsTitle: "Registre des Filières & Données Statistiques",
    recordsSubtitle: "Base de données des indicateurs statistiques généraux et comparatifs",
    emptyRecordsTitle: "Aucune donnée enregistrée",
    emptyRecordsDesc: "Saisissez votre première série dans le calculateur ou chargez des exemples statistiques.",
    startFirstEvaluationBtn: "Enregistrer un premier calcul",
    overallStatsTitle: "Indicateurs Statistiques Globaux Agrégrés",
    totalClassesLabel: "Nombre de Filières",
    totalStudentsLabel: "Effectif Total Cumulé",
    totalReadersLabel: "Total Groupe 1",
    totalNonReadersLabel: "Total Groupe 2",
    overallPercentageLabel: "Ratio Statistique Moyen Global",
    averageGradeLabel: "Moyenne Générale des Notes",
    bestClassLabel: "Filière avec le Ratio le Plus Élevé",
    needsSupportClassLabel: "Filière avec le Ratio le Plus Faible",
    noDataYet: "Aucune donnée",
    searchPlaceholder: "Rechercher une filière ou indicateur...",
    filterAll: "Toutes les mentions",
    confirmDeleteTitle: "Confirmer la suppression",
    confirmDeleteDesc: (className) => `Supprimer définitivement la filière "${className}" ?`,
    confirmDeleteAllTitle: "Confirmer la réinitialisation",
    confirmDeleteAllDesc: "Toutes les données statistiques seront supprimées de cet appareil.",
    deleteBtn: "Supprimer",
    cancelBtn: "Annuler",
    exportJsonBtn: "Exporter sauvegarde (JSON)",
    importJsonBtn: "Importer fichier (JSON)",
    clearAllBtn: "Tout effacer",
    savedSuccessToast: "Données statistiques enregistrées avec succès !",
    updatedSuccessToast: "Données statistiques mises à jour avec succès !",
    deletedSuccessToast: "Enregistrement supprimé du registre.",
    reportTitle: "Rapport Statistique et Analytique Officiel",
    reportSubtitle: "Document officiel prêt pour le conseil scientifique, les départements et le décanat",
    printBtn: "Imprimer / Enregistrer en PDF",
    republicTitle: "République Algérienne Démocratique et Populaire",
    ministryTitle: "Ministère de l'Enseignement Supérieur et de la Recherche Scientifique",
    directorateTitle: "Université / Faculté :",
    pedagogicalReportHeading: "Rapport Statistique sur les Indicateurs Académiques et Ratios Généraux",
    academicYearLabel: "Année Universitaire : 2025 / 2026",
    dateLabel: "Date du rapport :",
    inspectorSignature: "Visa du Président du Conseil Scientifique",
    principalSignature: "Visa de Monsieur/Madame le Doyen",
    teacherSignature: "Signature de l'Enseignant(e) Responsable",
    pedagogicalObservations: "Observations et Recommandations Statistiques",
    pedagogicalRecommendation: "Il est préconisé d'assurer un suivi statistique rigoureux et régulier, de valoriser les indicateurs numériques pour la prise de décision, et de structurer l'aide pédagogique.",
    comparisonChartTitle: "Comparatif des Ratios Statistiques par Filière",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    systemReady: "Prêt",
    ratioComparison: "Comparaison des deux groupes statistiques",
    readersLabel: "Groupe 1 (Validé)",
    nonReadersLabel: "Groupe 2 (Complémentaire)",
  },
  en: {
    appName: "SPSS",
    appFullName: "General Statistical Calculation & Academic Analytics System",
    appTagline: "Comprehensive statistical platform for computing percentages, metrics, and academic appraisals",
    navCalculator: "Statistics Calculator",
    navRecords: "Statistics Records",
    navReport: "Statistical Report (PDF)",
    teacherFormTitle: "Major Data & General Statistical Calculation",
    teacherFormSubtitle: "Enter numeric counts and dataset samples to instantly calculate percentages, visual charts, and grade /20",
    teacherName: "Academic Supervisor / Professor",
    teacherNamePlaceholder: "e.g., Prof. / Academic Supervisor",
    schoolName: "University / Academic Center",
    schoolNamePlaceholder: "University of Algiers (Example)",
    schoolNameGhostHint: "Faint default example - no need to backspace, type directly over it",
    className: "University Major / Category",
    classNamePlaceholder: "Select or type university major or category...",
    selectSpecialtyLabel: "Accredited Algerian University Majors",
    customSpecialtyLabel: "Or type a custom specialization",
    totalStudents: "Total Count (Population Size N)",
    totalStudentsPlaceholder: "e.g., 45",
    readersCount: "Group 1 / Positive Cases (Target n1)",
    readersCountPlaceholder: "Count of validated/positive cases",
    nonReadersCount: "Group 2 / Remaining Cases (n2)",
    nonReadersCountPlaceholder: "Calculated automatically if empty",
    autoCalculatedHint: "Calculated automatically from total",
    optional: "optional",
    saveClassBtn: "Save to Statistics Log",
    updateClassBtn: "Update Statistical Record",
    resetBtn: "Clear Fields",
    sampleClassesBtn: "Load Demo Datasets",
    liveStatsTitle: "Live Statistical Indicators",
    readerPercentage: "Group 1 Ratio (%)",
    nonReaderPercentage: "Group 2 Ratio (%)",
    gradeOutOf20: "Statistical Grade /20",
    evaluationLevel: "Statistical Appraisal",
    levelExcellent: "Very High (Outstanding)",
    levelGood: "High (Satisfactory)",
    levelNeedsEncouragement: "Moderate (Average)",
    levelLow: "Low (Requires Action)",
    levelDescExcellent: "Outstanding statistical indicator showing high achievement rates exceeding expected targets.",
    levelDescGood: "Positive statistical indicator demonstrating stable results and healthy distributions.",
    levelDescNeedsEncouragement: "Moderate statistical metric, recommended to analyze underlying variables to improve ratios.",
    levelDescLow: "Low statistical indicator requiring targeted interventions and root cause remediation.",
    errTotalPositive: "Total count must be greater than zero.",
    errWholeNumbers: "All numbers must be whole positive integers (0 or greater).",
    errReadersExceedTotal: (readers, total) => `Group 1 count (${readers}) exceeds total population (${total}).`,
    errNonReadersExceedTotal: (nonReaders, total) => `Group 2 count (${nonReaders}) exceeds total population (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `Sum of Group 1 (${readers}) + Group 2 (${nonReaders}) is ${sum}, which does not match total (${total}).`,
    errClassNameRequired: "Please select or enter a university major or statistical category.",
    recordsTitle: "Statistical Records Log",
    recordsSubtitle: "Centralized database of general statistical indicators, ratios, and cross-department comparisons",
    emptyRecordsTitle: "No statistical records saved yet",
    emptyRecordsDesc: "Enter your first series in the calculator or load demo datasets to explore analytics.",
    startFirstEvaluationBtn: "Perform First Calculation",
    overallStatsTitle: "Aggregate Statistical Indicators Across Majors",
    totalClassesLabel: "Total Majors",
    totalStudentsLabel: "Total Sample Size",
    totalReadersLabel: "Total Group 1 Count",
    totalNonReadersLabel: "Total Group 2 Count",
    overallPercentageLabel: "Aggregate Overall Ratio",
    averageGradeLabel: "Average Statistical Grade",
    bestClassLabel: "Major with Highest Ratio",
    needsSupportClassLabel: "Major with Lowest Ratio",
    noDataYet: "No data available",
    searchPlaceholder: "Search major or metric...",
    filterAll: "All appraisals",
    confirmDeleteTitle: "Confirm Deletion",
    confirmDeleteDesc: (className) => `Permanently delete statistical record "${className}"?`,
    confirmDeleteAllTitle: "Confirm Clear All",
    confirmDeleteAllDesc: "All saved statistical records will be permanently removed.",
    deleteBtn: "Delete",
    cancelBtn: "Cancel",
    exportJsonBtn: "Export Backup (JSON)",
    importJsonBtn: "Import File (JSON)",
    clearAllBtn: "Clear All Records",
    savedSuccessToast: "Statistical record saved successfully!",
    updatedSuccessToast: "Statistical record updated successfully!",
    deletedSuccessToast: "Record deleted successfully.",
    reportTitle: "Official Statistical & Analytical Report",
    reportSubtitle: "Printable document formatted for department heads, deans, and scientific councils",
    printBtn: "Print / Save as PDF",
    republicTitle: "People's Democratic Republic of Algeria",
    ministryTitle: "Ministry of Higher Education and Scientific Research",
    directorateTitle: "University / Faculty:",
    pedagogicalReportHeading: "Comprehensive Statistical Report on Academic Indicators and General Ratios",
    academicYearLabel: "Academic Year: 2025 / 2026",
    dateLabel: "Report Date:",
    inspectorSignature: "Scientific Council Chair Visa",
    principalSignature: "Faculty Dean Visa",
    teacherSignature: "Supervising Professor Signature",
    pedagogicalObservations: "Statistical Observations & Recommendations",
    pedagogicalRecommendation: "Continuous statistical monitoring is advised to drive academic excellence, utilizing data-driven decisions and tailored pedagogical interventions based on computed metrics.",
    comparisonChartTitle: "Statistical Ratio Comparison Across University Majors",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    systemReady: "Ready",
    ratioComparison: "Comparative Group Breakdown",
    readersLabel: "Group 1 (Targeted)",
    nonReadersLabel: "Group 2 (Remaining)",
  }
};
