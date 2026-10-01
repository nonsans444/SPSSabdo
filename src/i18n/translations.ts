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
    appFullName: "نظام إحصاء شغف المطالعة لدى التلاميذ",
    appTagline: "منظومة إحصائية وتربوية بيداغوجية خاصة بالأساتذة والمؤسسات التعليمية الجزائرية",
    navCalculator: "حاسبة التقييم",
    navRecords: "سجل الأقسام والإحصائيات",
    navReport: "التقرير البيداغوجي (طباعة)",
    teacherFormTitle: "بيانات تقييم المطالعة",
    teacherFormSubtitle: "أدخل معطيات التلاميذ للحصول على الإحصائيات الفورية والعلامة من 20",
    teacherName: "اسم الأستاذ(ة)",
    teacherNamePlaceholder: "مثال: أ. بن علي",
    schoolName: "المؤسسة التعليمية",
    schoolNamePlaceholder: "مثال: متوسطة الأمير عبد القادر",
    className: "القسم / الفوج التربوي",
    classNamePlaceholder: "مثال: 3م2، 1ع1، 5اب3",
    totalStudents: "العدد الإجمالي للتلاميذ",
    totalStudentsPlaceholder: "مثال: 32",
    readersCount: "عدد التلاميذ المحبين للمطالعة",
    readersCountPlaceholder: "تلاميذ يطالعون بانتظام",
    nonReadersCount: "عدد التلاميذ غير المهتمين بالمطالعة",
    nonReadersCountPlaceholder: "يُحسب تلقائياً إذا تُرِك فارغاً",
    autoCalculatedHint: "يحسب تلقائياً بناءً على المجموع",
    optional: "اختياري",
    saveClassBtn: "حفظ في السجل المدرسي",
    updateClassBtn: "تحديث بيانات القسم",
    resetBtn: "تفريغ الحقول",
    sampleClassesBtn: "تحميل بيانات تجريبية",
    liveStatsTitle: "النتائج التقييمية الفورية",
    readerPercentage: "نسبة محبي المطالعة",
    nonReaderPercentage: "نسبة غير المطالعين",
    gradeOutOf20: "العلامة التقديرية",
    evaluationLevel: "التقدير البيداغوجي",
    levelExcellent: "ممتاز",
    levelGood: "جيد",
    levelNeedsEncouragement: "يحتاج إلى تشجيع",
    levelLow: "ضعيف",
    levelDescExcellent: "شغف استثنائي بالمطالعة يستحق التكريم ومواصلة التحفيز",
    levelDescGood: "مستوى إيجابي يظهر اهتماماً جيداً بالكتب والقراءة",
    levelDescNeedsEncouragement: "الفوج يتطلب خطة تنشيط قرائي وتفعيل المكتبة المدرسية",
    levelDescLow: "يتطلب تدخلاً بيداغوجياً عاجلاً ومشاريع قراءة موجهة",
    errTotalPositive: "يجب أن يكون العدد الإجمالي للتلاميذ أكبر من الصفر.",
    errWholeNumbers: "جميع الأعداد يجب أن تكون أعداداً صحيحة طبيعية (0 فما فوق).",
    errReadersExceedTotal: (readers, total) => `عدد المطالعين (${readers}) أكبر من إجمالي التلاميذ (${total}). يُرجى التحقق من الأعداد.`,
    errNonReadersExceedTotal: (nonReaders, total) => `عدد غير المطالعين (${nonReaders}) أكبر من إجمالي التلاميذ (${total}). يُرجى التحقق.`,
    errSumMismatch: (readers, nonReaders, sum, total) => `مجموع المطالعين (${readers}) وغير المطالعين (${nonReaders}) هو ${sum}، وهو لا يساوي المجموع الكلي (${total}).`,
    errClassNameRequired: "يُرجى إدخال اسم القسم أو الفوج التربوي.",
    recordsTitle: "سجل الأقسام المسجلة",
    recordsSubtitle: "قاعدة بيانات الأفواج المقيّمة وإحصائيات شغف القراءة المجمّعة",
    emptyRecordsTitle: "لا توجد أقسام مسجلة حتى الآن",
    emptyRecordsDesc: "قم بإدخال بيانات فوجك الأول في حاسبة التقييم أو حمّل نماذج تجريبية للمعاينة.",
    startFirstEvaluationBtn: "إجراء أول تقييم للقسم",
    overallStatsTitle: "المؤشرات الإحصائية العامة لكافة الأقسام",
    totalClassesLabel: "عدد الأقسام",
    totalStudentsLabel: "مجموع التلاميذ",
    totalReadersLabel: "إجمالي المطالعين",
    totalNonReadersLabel: "غير المطالعين",
    overallPercentageLabel: "النسبة العامة للمطالعة",
    averageGradeLabel: "المعدل العام للعلامات",
    bestClassLabel: "الفوج الأكثر شغفاً بالمطالعة",
    needsSupportClassLabel: "الفوج الأكثر حاجة للمرافقة",
    noDataYet: "لا توجد معطيات",
    searchPlaceholder: "البحث عن قسم أو مستوى...",
    filterAll: "جميع التقديرات",
    confirmDeleteTitle: "تأكيد حذف الفوج",
    confirmDeleteDesc: (className) => `هل أنت متأكد من حذف بيانات القسم "${className}" نهائياً من السجل؟`,
    confirmDeleteAllTitle: "تأكيد مسح كافة السجلات",
    confirmDeleteAllDesc: "سيتم حذف جميع سجلات الأقسام المحفوظة في هذا المتصفح نهائياً.",
    deleteBtn: "حذف",
    cancelBtn: "إلغاء",
    exportJsonBtn: "تصدير نسخة احتياطية (JSON)",
    importJsonBtn: "استيراد نسخة (JSON)",
    clearAllBtn: "مسح جميع السجلات",
    savedSuccessToast: "تم حفظ بيانات القسم بنجاح في السجل!",
    updatedSuccessToast: "تم تحديث بيانات القسم بنجاح!",
    deletedSuccessToast: "تم حذف السجل بنجاح.",
    reportTitle: "التقرير البيداغوجي الموحد",
    reportSubtitle: "وثيقة تربوية رسمية جاهزة للطباعة والتسليم للإدارة ومفتش المادة",
    printBtn: "طباعة التقرير / حفظ كـ PDF",
    republicTitle: "الجمهورية الجزائرية الديمقراطية الشعبية",
    ministryTitle: "وزارة التربية الوطنية",
    directorateTitle: "مديرية التربية لولاية",
    pedagogicalReportHeading: "تقرير بيداغوجي إحصائي حول واقع المطالعة المدرسية",
    academicYearLabel: "السنة الدراسية: 2025 / 2026",
    dateLabel: "تاريخ إعداد التقرير:",
    inspectorSignature: "تأشيرة السيد(ة) مفتش(ة) التعليم",
    principalSignature: "موافقة السيد(ة) مدير(ة) المؤسسة",
    teacherSignature: "إمضاء الأستاذ(ة) المشرف(ة)",
    pedagogicalObservations: "الملاحظات البيداغوجية والتوصيات العامة",
    pedagogicalRecommendation: "يوصى بتكثيف نوادي القراءة، تنظيم مسابقات 'تحدي القراءة العربي'، وإدراج حصة مطالعة حرة أسبوعية في رزنامة الأنشطة الصفية.",
    comparisonChartTitle: "مقارنة نسب المطالعة بين مختلف الأقسام",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    systemReady: "جاهز ومحدّث",
    ratioComparison: "المقارنة النسبية بين المجموعتين",
    readersLabel: "محبو المطالعة",
    nonReadersLabel: "غير المهتمين بالمطالعة",
  },
  fr: {
    appName: "SPSS",
    appFullName: "Système de Statistiques de la Passion de la Lecture des Élèves",
    appTagline: "Outil pédagogique statistique pour les enseignants et établissements scolaires algériens",
    navCalculator: "Calculateur",
    navRecords: "Registres & Statistiques",
    navReport: "Rapport Pédagogique (PDF)",
    teacherFormTitle: "Données de la Classe & Évaluation de Lecture",
    teacherFormSubtitle: "Saisissez les effectifs pour obtenir instantanément les pourcentages et la note sur 20",
    teacherName: "Nom de l'Enseignant(e)",
    teacherNamePlaceholder: "Ex: M. Benali",
    schoolName: "Établissement Scolaire",
    schoolNamePlaceholder: "Ex: CEM Émir Abdelkader",
    className: "Classe / Division",
    classNamePlaceholder: "Ex: 3AM2, 1AS1, 5AP",
    totalStudents: "Effectif Total des Élèves",
    totalStudentsPlaceholder: "Ex: 32",
    readersCount: "Élèves passionnés de lecture",
    readersCountPlaceholder: "Élèves lisant régulièrement",
    nonReadersCount: "Élèves non lecteurs",
    nonReadersCountPlaceholder: "Calculé automatiquement si vide",
    autoCalculatedHint: "Calculé automatiquement à partir du total",
    optional: "optionnel",
    saveClassBtn: "Enregistrer dans le Registre",
    updateClassBtn: "Mettre à jour la classe",
    resetBtn: "Réinitialiser",
    sampleClassesBtn: "Charger exemples",
    liveStatsTitle: "Résultats Évaluatifs en Temps Réel",
    readerPercentage: "Pourcentage de Lecteurs",
    nonReaderPercentage: "Pourcentage de Non-Lecteurs",
    gradeOutOf20: "Note Pédagogique",
    evaluationLevel: "Appréciation",
    levelExcellent: "Excellent",
    levelGood: "Bien",
    levelNeedsEncouragement: "À encourager",
    levelLow: "Faible",
    levelDescExcellent: "Forte passion pour la lecture, à féliciter et valoriser.",
    levelDescGood: "Niveau positif témoignant d'un intérêt réel pour le livre.",
    levelDescNeedsEncouragement: "Nécessite des séances de dynamisation et l'accès à la bibliothèque.",
    levelDescLow: "Nécessite un plan d'action d'urgence et des lectures guidées.",
    errTotalPositive: "L'effectif total doit être supérieur à zéro.",
    errWholeNumbers: "Tous les effectifs doivent être des nombres entiers positifs ou nuls.",
    errReadersExceedTotal: (readers, total) => `Le nombre de lecteurs (${readers}) dépasse l'effectif total (${total}). Vérifiez les nombres.`,
    errNonReadersExceedTotal: (nonReaders, total) => `Le nombre de non-lecteurs (${nonReaders}) dépasse l'effectif total (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `La somme lecteurs (${readers}) + non-lecteurs (${nonReaders}) est ${sum}, différente du total (${total}).`,
    errClassNameRequired: "Veuillez renseigner le nom de la classe.",
    recordsTitle: "Registre des Classes Enregistrées",
    recordsSubtitle: "Base de données pédagogique et statistiques globales",
    emptyRecordsTitle: "Aucune classe enregistrée",
    emptyRecordsDesc: "Saisissez votre première classe dans le calculateur ou chargez des données de démonstration.",
    startFirstEvaluationBtn: "Évaluer une première classe",
    overallStatsTitle: "Indicateurs Statistiques Globaux",
    totalClassesLabel: "Nombre de Classes",
    totalStudentsLabel: "Total des Élèves",
    totalReadersLabel: "Total Lecteurs",
    totalNonReadersLabel: "Total Non-Lecteurs",
    overallPercentageLabel: "Taux Global de Lecture",
    averageGradeLabel: "Moyenne des Notes",
    bestClassLabel: "Meilleure Classe (Lecture)",
    needsSupportClassLabel: "Classe Nécessitant Soutien",
    noDataYet: "Aucune donnée",
    searchPlaceholder: "Rechercher une classe...",
    filterAll: "Toutes les mentions",
    confirmDeleteTitle: "Confirmer la suppression",
    confirmDeleteDesc: (className) => `Êtes-vous sûr de vouloir supprimer définitivement la classe "${className}" ?`,
    confirmDeleteAllTitle: "Confirmer la réinitialisation",
    confirmDeleteAllDesc: "Toutes les données de classes seront supprimées de votre appareil.",
    deleteBtn: "Supprimer",
    cancelBtn: "Annuler",
    exportJsonBtn: "Exporter sauvegarde (JSON)",
    importJsonBtn: "Importer fichier (JSON)",
    clearAllBtn: "Tout effacer",
    savedSuccessToast: "Classe enregistrée avec succès !",
    updatedSuccessToast: "Classe mise à jour avec succès !",
    deletedSuccessToast: "Classe supprimée du registre.",
    reportTitle: "Rapport Pédagogique Officiel",
    reportSubtitle: "Document imprimable prêt pour la direction et l'inspection pédagogique",
    printBtn: "Imprimer / Enregistrer en PDF",
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
    comparisonChartTitle: "Comparatif des Taux de Lecture par Classe",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    systemReady: "Prêt",
    ratioComparison: "Comparaison des deux groupes",
    readersLabel: "Élèves Lecteurs",
    nonReadersLabel: "Élèves Non-Lecteurs",
  },
  en: {
    appName: "SPSS",
    appFullName: "Students' Passion for reading Statistics System",
    appTagline: "Educational statistics and pedagogical grading system for Algerian schools",
    navCalculator: "Evaluation Form",
    navRecords: "Class Records & Stats",
    navReport: "Pedagogical Report (PDF)",
    teacherFormTitle: "Class Information & Reading Assessment",
    teacherFormSubtitle: "Enter student counts to instantly calculate percentages and a grade out of 20",
    teacherName: "Teacher Name",
    teacherNamePlaceholder: "e.g., Mr. Benali",
    schoolName: "School Name",
    schoolNamePlaceholder: "e.g., Emir Abdelkader Middle School",
    className: "Class / Level",
    classNamePlaceholder: "e.g., 3AM2, 1AS1, 5AP",
    totalStudents: "Total Number of Students",
    totalStudentsPlaceholder: "e.g., 32",
    readersCount: "Number Who Like Reading",
    readersCountPlaceholder: "Students who read regularly",
    nonReadersCount: "Number Who Do Not Like Reading",
    nonReadersCountPlaceholder: "Calculated automatically if empty",
    autoCalculatedHint: "Calculated automatically from total",
    optional: "optional",
    saveClassBtn: "Save to School Records",
    updateClassBtn: "Update Class Record",
    resetBtn: "Clear Fields",
    sampleClassesBtn: "Load Demo Data",
    liveStatsTitle: "Live Evaluation Results",
    readerPercentage: "Readers Percentage",
    nonReaderPercentage: "Non-Readers Percentage",
    gradeOutOf20: "Pedagogical Grade",
    evaluationLevel: "Level / Appraisal",
    levelExcellent: "Excellent",
    levelGood: "Good",
    levelNeedsEncouragement: "Needs Encouragement",
    levelLow: "Low",
    levelDescExcellent: "Exceptional reading enthusiasm, deserves commendation and rewards.",
    levelDescGood: "Positive engagement showing genuine interest in books.",
    levelDescNeedsEncouragement: "Requires structured reading activities and active library engagement.",
    levelDescLow: "Urgent pedagogical reading intervention and guided projects needed.",
    errTotalPositive: "Total number of students must be greater than zero.",
    errWholeNumbers: "All numbers must be whole positive integers (0 or greater).",
    errReadersExceedTotal: (readers, total) => `Readers (${readers}) exceed the total (${total}). Check the numbers.`,
    errNonReadersExceedTotal: (nonReaders, total) => `Non-readers (${nonReaders}) exceed the total (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `The sum of readers (${readers}) and non-readers (${nonReaders}) is ${sum}, which does not match total (${total}).`,
    errClassNameRequired: "Please enter the class name or code.",
    recordsTitle: "Saved Class Records",
    recordsSubtitle: "Centralized record log and aggregate statistical indicators",
    emptyRecordsTitle: "No classes saved yet",
    emptyRecordsDesc: "Enter your first class in the evaluation calculator or load sample data to explore.",
    startFirstEvaluationBtn: "Conduct First Evaluation",
    overallStatsTitle: "Aggregate School Reading Indicators",
    totalClassesLabel: "Total Classes",
    totalStudentsLabel: "Total Students",
    totalReadersLabel: "Total Readers",
    totalNonReadersLabel: "Total Non-Readers",
    overallPercentageLabel: "Overall Reading Rate",
    averageGradeLabel: "Average Grade",
    bestClassLabel: "Top Reading Class",
    needsSupportClassLabel: "Class Needing Most Support",
    noDataYet: "No data available",
    searchPlaceholder: "Search class or level...",
    filterAll: "All appraisals",
    confirmDeleteTitle: "Confirm Deletion",
    confirmDeleteDesc: (className) => `Are you sure you want to permanently delete class "${className}"?`,
    confirmDeleteAllTitle: "Confirm Clear All",
    confirmDeleteAllDesc: "All saved class records will be permanently removed from this browser.",
    deleteBtn: "Delete",
    cancelBtn: "Cancel",
    exportJsonBtn: "Export Backup (JSON)",
    importJsonBtn: "Import File (JSON)",
    clearAllBtn: "Clear All Records",
    savedSuccessToast: "Class successfully saved to records!",
    updatedSuccessToast: "Class record updated successfully!",
    deletedSuccessToast: "Record deleted successfully.",
    reportTitle: "Official Pedagogical Report",
    reportSubtitle: "Printable document formatted for school administration and inspection review",
    printBtn: "Print / Save as PDF",
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
    comparisonChartTitle: "Reading Rate Comparison Across Classes",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    systemReady: "Ready",
    ratioComparison: "Comparative Group Breakdown",
    readersLabel: "Readers",
    nonReadersLabel: "Non-Readers",
  }
};
