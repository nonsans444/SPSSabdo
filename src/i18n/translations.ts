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
    appFullName: "نظام إحصاء شغف المطالعة والبحث الأكاديمي لدى الطلبة",
    appTagline: "منظومة إحصائية بيداغوجية لتحليل الإقبال على المطالعة والبحث العلمي بالجامعات الجزائرية",
    navCalculator: "حاسبة التخصص",
    navRecords: "سجل التخصصات الجامعية",
    navReport: "التقرير الأكاديمي (طباعة)",
    teacherFormTitle: "بيانات التخصص الجامعي والمطالعة",
    teacherFormSubtitle: "اختر التخصص الجامعي الجزائري وأدخل معطيات الطلبة للحصول على الإحصائيات الفورية والعلامة من 20",
    teacherName: "الأستاذ(ة) المشرف / المحاضر",
    teacherNamePlaceholder: "مثال: د. الأستاذ المشرف",
    schoolName: "الجامعة / المركز الجامعي",
    schoolNamePlaceholder: "جامعة الجزائر (مثال)",
    schoolNameGhostHint: "مثال افتراضي ضبابي - لا يلزمك مسحه، يمكنك الكتابة فوقه مباشرة",
    className: "التخصص الجامعي",
    classNamePlaceholder: "اختر أو اكتب التخصص الجامعي...",
    selectSpecialtyLabel: "قائمة التخصصات الجامعية المعتمدة بالجزائر",
    customSpecialtyLabel: "أو اكتب تخصصاً مخصصاً",
    totalStudents: "العدد الإجمالي لطلبة التخصص",
    totalStudentsPlaceholder: "مثال: 45",
    readersCount: "عدد الطلبة المطالعين والباحثين",
    readersCountPlaceholder: "طلبة يطالعون ويبحثون بانتظام",
    nonReadersCount: "عدد الطلبة غير المطالعين",
    nonReadersCountPlaceholder: "يُحسب تلقائياً إذا تُرِك فارغاً",
    autoCalculatedHint: "يحسب تلقائياً بناءً على المجموع",
    optional: "اختياري",
    saveClassBtn: "حفظ في سجل التخصصات",
    updateClassBtn: "تحديث بيانات التخصص",
    resetBtn: "تفريغ الحقول",
    sampleClassesBtn: "تحميل نماذج التخصصات",
    liveStatsTitle: "المؤشرات التقييمية الفورية",
    readerPercentage: "نسبة الطلبة المطالعين",
    nonReaderPercentage: "نسبة غير المطالعين",
    gradeOutOf20: "العلامة التقديرية للتخصص",
    evaluationLevel: "التقدير الأكاديمي والبيداغوجي",
    levelExcellent: "ممتاز (أداء استثنائي)",
    levelGood: "جيد (أداء إيجابي)",
    levelNeedsEncouragement: "متوسط (يحتاج تشجيعاً)",
    levelLow: "منخفض (يتطلب تدخلاً)",
    levelDescExcellent: "شغف استثنائي بالمطالعة والبحث الأكاديمي في المراجع التخصصية والمجلات العلمية.",
    levelDescGood: "مستوى إيجابي يظهر اهتماماً جيداً بالكتب التخصصية والمصادر الأكاديمية.",
    levelDescNeedsEncouragement: "التخصص يتطلب تحفيزاً إضافياً وربط المقاييس بالبحث المكتبي وقواعد البيانات الرقمية.",
    levelDescLow: "يتطلب خطة عمل مستعجلة وتخصيص ساعات مطالعة موجهة وورشات بحث علمي.",
    errTotalPositive: "يجب أن يكون العدد الإجمالي للطلبة أكبر من الصفر.",
    errWholeNumbers: "جميع الأعداد يجب أن تكون أعداداً صحيحة طبيعية (0 فما فوق).",
    errReadersExceedTotal: (readers, total) => `عدد المطالعين (${readers}) أكبر من إجمالي الطلبة (${total}). يُرجى التحقق من الأعداد.`,
    errNonReadersExceedTotal: (nonReaders, total) => `عدد غير المطالعين (${nonReaders}) أكبر من إجمالي الطلبة (${total}). يُرجى التحقق.`,
    errSumMismatch: (readers, nonReaders, sum, total) => `مجموع المطالعين (${readers}) وغير المطالعين (${nonReaders}) هو ${sum}، وهو لا يساوي المجموع الكلي (${total}).`,
    errClassNameRequired: "يُرجى اختيار أو إدخال التخصص الجامعي.",
    recordsTitle: "سجل التخصصات الجامعية المسجلة",
    recordsSubtitle: "قاعدة بيانات التخصصات الجامعية ومؤشرات المطالعة والبحث العلمي",
    emptyRecordsTitle: "لا توجد تخصصات مسجلة حتى الآن",
    emptyRecordsDesc: "قم بإدخال بيانات تخصصك الأول في الحاسبة أو حمّل نماذج التخصصات الجزائرية للمعاينة.",
    startFirstEvaluationBtn: "تسجيل أول تخصص جامعي",
    overallStatsTitle: "المؤشرات الإحصائية العامة لكافة التخصصات",
    totalClassesLabel: "عدد التخصصات",
    totalStudentsLabel: "مجموع الطلبة",
    totalReadersLabel: "إجمالي الطلبة المطالعين",
    totalNonReadersLabel: "الطلبة غير المطالعين",
    overallPercentageLabel: "النسبة العامة للمطالعة الجامعية",
    averageGradeLabel: "المعدل العام للعلامات الأكاديمية",
    bestClassLabel: "التخصص الأكثر إقبالاً على المطالعة",
    needsSupportClassLabel: "التخصص الأكثر حاجة للتفعيل القرائي",
    noDataYet: "لا توجد معطيات",
    searchPlaceholder: "البحث عن تخصص جامعي أو كلية...",
    filterAll: "جميع التقديرات",
    confirmDeleteTitle: "تأكيد حذف التخصص",
    confirmDeleteDesc: (className) => `هل أنت متأكد من حذف بيانات التخصص "${className}" نهائياً من السجل؟`,
    confirmDeleteAllTitle: "تأكيد مسح كافة التخصصات",
    confirmDeleteAllDesc: "سيتم حذف جميع سجلات التخصصات الجامعية المحفوظة نهائياً.",
    deleteBtn: "حذف",
    cancelBtn: "إلغاء",
    exportJsonBtn: "تصدير نسخة احتياطية (JSON)",
    importJsonBtn: "استيراد ملف (JSON)",
    clearAllBtn: "مسح جميع السجلات",
    savedSuccessToast: "تم حفظ بيانات التخصص الجامعي بنجاح في السجل!",
    updatedSuccessToast: "تم تحديث بيانات التخصص بنجاح!",
    deletedSuccessToast: "تم حذف السجل بنجاح.",
    reportTitle: "التقرير الأكاديمي والبيداغوجي الموحد",
    reportSubtitle: "وثيقة جامعية رسمية جاهزة للطباعة والتسليم لرئاسة القسم والعمادة والمجلس العلمي",
    printBtn: "طباعة التقرير / حفظ كـ PDF",
    republicTitle: "الجمهورية الجزائرية الديمقراطية الشعبية",
    ministryTitle: "وزارة التعليم العالي والبحث العلمي",
    directorateTitle: "الجامعة / الكلية:",
    pedagogicalReportHeading: "تقرير إحصائي بيداغوجي حول واقع المطالعة والبحث التوثيقي في الوسط الجامعي",
    academicYearLabel: "السنة الجامعية: 2025 / 2026",
    dateLabel: "تاريخ إعداد التقرير:",
    inspectorSignature: "تأشيرة رئيس المجلس العلمي للكلية",
    principalSignature: "موافقة السيد(ة) عميد الكلية / مدير المعهد",
    teacherSignature: "إمضاء الأستاذ(ة) المشرف(ة) / المحاضر",
    pedagogicalObservations: "الملاحظات البيداغوجية والتوصيات الأكاديمية",
    pedagogicalRecommendation: "يوصى بتكثيف الاشتراكات في قواعد البيانات العلمية (SNDL)، وتنظيم ورشات تدريبية للبحث الببليوغرافي، وتفعيل معارض الكتب الأكاديمية داخل الكليات.",
    comparisonChartTitle: "مقارنة نسب المطالعة بين التخصصات الجامعية المختلفة",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    systemReady: "جاهز ومحدّث",
    ratioComparison: "المقارنة النسبية بين المجموعتين",
    readersLabel: "الطلبة المطالعون",
    nonReadersLabel: "الطلبة غير المطالعين",
  },
  fr: {
    appName: "SPSS",
    appFullName: "Système de Statistiques de la Passion de la Lecture Universitaire",
    appTagline: "Outil statistique et pédagogique pour l'évaluation de la lecture dans les universités algériennes",
    navCalculator: "Calculateur",
    navRecords: "Filières Universitaires",
    navReport: "Rapport Académique (PDF)",
    teacherFormTitle: "Filière Universitaire & Évaluation de Lecture",
    teacherFormSubtitle: "Sélectionnez la filière algérienne et saisissez les effectifs pour obtenir l'analyse instantanée sur 20",
    teacherName: "Enseignant(e) Référent / Maître de Conférences",
    teacherNamePlaceholder: "Ex: Dr. / Enseignant Référent",
    schoolName: "Université / Centre Universitaire",
    schoolNamePlaceholder: "Université d'Alger (Exemple)",
    schoolNameGhostHint: "Exemple indicatif estompé - Inutile d'effacer, saisissez directement votre établissement",
    className: "Filière / Spécialité Universitaire",
    classNamePlaceholder: "Choisir ou saisir une spécialité...",
    selectSpecialtyLabel: "Spécialités universitaires algériennes",
    customSpecialtyLabel: "Ou saisir une spécialité personnalisée",
    totalStudents: "Effectif Total des Étudiants",
    totalStudentsPlaceholder: "Ex: 45",
    readersCount: "Étudiants assidus à la lecture",
    readersCountPlaceholder: "Étudiants consultant régulièrement des ouvrages",
    nonReadersCount: "Étudiants non-lecteurs",
    nonReadersCountPlaceholder: "Calculé automatiquement si vide",
    autoCalculatedHint: "Calculé automatiquement à partir du total",
    optional: "optionnel",
    saveClassBtn: "Enregistrer dans le Registre",
    updateClassBtn: "Mettre à jour la filière",
    resetBtn: "Réinitialiser",
    sampleClassesBtn: "Charger exemples de filières",
    liveStatsTitle: "Indicateurs Académiques Instantanés",
    readerPercentage: "Taux d'Étudiants Lecteurs",
    nonReaderPercentage: "Taux de Non-Lecteurs",
    gradeOutOf20: "Note de la Filière sur 20",
    evaluationLevel: "Appréciation Pédagogique",
    levelExcellent: "Excellent (Remarquable)",
    levelGood: "Bien (Satisfaisant)",
    levelNeedsEncouragement: "Moyen (À encourager)",
    levelLow: "Faible (Action requise)",
    levelDescExcellent: "Passion remarquable pour la recherche bibliographique et la lecture académique.",
    levelDescGood: "Niveau positif témoignant d'un réel intérêt pour la documentation universitaire.",
    levelDescNeedsEncouragement: "Nécessite une dynamisation de l'accès aux plateformes scientifiques et à la bibliothèque.",
    levelDescLow: "Nécessite des ateliers méthodologiques de recherche documentaire d'urgence.",
    errTotalPositive: "L'effectif total d'étudiants doit être supérieur à zéro.",
    errWholeNumbers: "Tous les effectifs doivent être des entiers positifs ou nuls.",
    errReadersExceedTotal: (readers, total) => `Le nombre de lecteurs (${readers}) dépasse l'effectif total (${total}).`,
    errNonReadersExceedTotal: (nonReaders, total) => `Le nombre de non-lecteurs (${nonReaders}) dépasse l'effectif total (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `La somme lecteurs (${readers}) + non-lecteurs (${nonReaders}) est ${sum}, différente du total (${total}).`,
    errClassNameRequired: "Veuillez sélectionner ou saisir une spécialité universitaire.",
    recordsTitle: "Registre des Filières Universitaires",
    recordsSubtitle: "Base de données académique et statistiques comparatives des spécialités",
    emptyRecordsTitle: "Aucune filière enregistrée",
    emptyRecordsDesc: "Saisissez votre première filière dans le calculateur ou chargez des exemples universitaires.",
    startFirstEvaluationBtn: "Enregistrer une première filière",
    overallStatsTitle: "Indicateurs Statistiques Globaux des Filières",
    totalClassesLabel: "Nombre de Filières",
    totalStudentsLabel: "Total des Étudiants",
    totalReadersLabel: "Total Étudiants Lecteurs",
    totalNonReadersLabel: "Total Non-Lecteurs",
    overallPercentageLabel: "Taux Global de Lecture",
    averageGradeLabel: "Moyenne Générale des Notes",
    bestClassLabel: "Filière la Plus Assidue",
    needsSupportClassLabel: "Filière Nécessitant un Appui",
    noDataYet: "Aucune donnée",
    searchPlaceholder: "Rechercher une filière ou faculté...",
    filterAll: "Toutes les mentions",
    confirmDeleteTitle: "Confirmer la suppression",
    confirmDeleteDesc: (className) => `Supprimer définitivement la filière "${className}" ?`,
    confirmDeleteAllTitle: "Confirmer la réinitialisation",
    confirmDeleteAllDesc: "Toutes les filières universitaires seront supprimées de cet appareil.",
    deleteBtn: "Supprimer",
    cancelBtn: "Annuler",
    exportJsonBtn: "Exporter sauvegarde (JSON)",
    importJsonBtn: "Importer fichier (JSON)",
    clearAllBtn: "Tout effacer",
    savedSuccessToast: "Filière universitaire enregistrée avec succès !",
    updatedSuccessToast: "Filière mise à jour avec succès !",
    deletedSuccessToast: "Filière supprimée du registre.",
    reportTitle: "Rapport Pédagogique et Académique",
    reportSubtitle: "Document officiel universitaire prêt pour le conseil scientifique et le décanat",
    printBtn: "Imprimer / Enregistrer en PDF",
    republicTitle: "République Algérienne Démocratique et Populaire",
    ministryTitle: "Ministère de l'Enseignement Supérieur et de la Recherche Scientifique",
    directorateTitle: "Université / Faculté :",
    pedagogicalReportHeading: "Rapport Statistique sur les Pratiques de Lecture et de Documentation Universitaire",
    academicYearLabel: "Année Universitaire : 2025 / 2026",
    dateLabel: "Date du rapport :",
    inspectorSignature: "Visa du Président du Conseil Scientifique",
    principalSignature: "Visa de Monsieur/Madame le Doyen",
    teacherSignature: "Signature de l'Enseignant(e) Responsable",
    pedagogicalObservations: "Observations Pédagogiques & Recommandations",
    pedagogicalRecommendation: "Il est préconisé d'intensifier l'usage du portail SNDL, d'organiser des salons du livre académique et d'initier les étudiants aux techniques de veille bibliographique.",
    comparisonChartTitle: "Comparatif des Taux de Lecture par Filière Universitaire",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    systemReady: "Prêt",
    ratioComparison: "Comparaison des deux groupes",
    readersLabel: "Étudiants Lecteurs",
    nonReadersLabel: "Étudiants Non-Lecteurs",
  },
  en: {
    appName: "SPSS",
    appFullName: "Students' Passion for reading Statistics System - Higher Education",
    appTagline: "Academic statistical and pedagogical evaluation system for Algerian universities",
    navCalculator: "Evaluation Form",
    navRecords: "University Majors & Stats",
    navReport: "Academic Report (PDF)",
    teacherFormTitle: "University Major & Reading Assessment",
    teacherFormSubtitle: "Select an Algerian university major and enter student counts to calculate statistics and grade out of 20",
    teacherName: "Academic Supervisor / Professor",
    teacherNamePlaceholder: "e.g., Prof. / Academic Supervisor",
    schoolName: "University / Academic Center",
    schoolNamePlaceholder: "University of Algiers (Example)",
    schoolNameGhostHint: "Faint default example - no need to backspace, type directly over it",
    className: "University Major / Specialization",
    classNamePlaceholder: "Select or type university major...",
    selectSpecialtyLabel: "Accredited Algerian University Majors",
    customSpecialtyLabel: "Or type a custom specialization",
    totalStudents: "Total Enrolled Students",
    totalStudentsPlaceholder: "e.g., 45",
    readersCount: "Students Engaged in Reading & Research",
    readersCountPlaceholder: "Students who read books regularly",
    nonReadersCount: "Non-Reading Students",
    nonReadersCountPlaceholder: "Calculated automatically if empty",
    autoCalculatedHint: "Calculated automatically from total",
    optional: "optional",
    saveClassBtn: "Save to University Records",
    updateClassBtn: "Update Major Record",
    resetBtn: "Clear Fields",
    sampleClassesBtn: "Load Demo University Majors",
    liveStatsTitle: "Live Academic Indicators",
    readerPercentage: "Reading Engagement Rate",
    nonReaderPercentage: "Non-Readers Rate",
    gradeOutOf20: "Major Grade /20",
    evaluationLevel: "Academic Appraisal",
    levelExcellent: "Excellent (Outstanding)",
    levelGood: "Good (Satisfactory)",
    levelNeedsEncouragement: "Moderate (Needs Motivation)",
    levelLow: "Low (Requires Action)",
    levelDescExcellent: "Outstanding engagement in academic literature, journals, and books.",
    levelDescGood: "Positive engagement demonstrating genuine interest in university literature.",
    levelDescNeedsEncouragement: "Requires further motivation and linkage between coursework and library resources.",
    levelDescLow: "Requires urgent guided reading seminars and bibliographic literacy workshops.",
    errTotalPositive: "Total number of students must be greater than zero.",
    errWholeNumbers: "All numbers must be whole positive integers (0 or greater).",
    errReadersExceedTotal: (readers, total) => `Readers (${readers}) exceed total students (${total}).`,
    errNonReadersExceedTotal: (nonReaders, total) => `Non-readers (${nonReaders}) exceed total students (${total}).`,
    errSumMismatch: (readers, nonReaders, sum, total) => `Sum of readers (${readers}) + non-readers (${nonReaders}) is ${sum}, which does not match total (${total}).`,
    errClassNameRequired: "Please select or enter a university major.",
    recordsTitle: "University Majors Records",
    recordsSubtitle: "Centralized academic record log and comparative reading indicators across departments",
    emptyRecordsTitle: "No university majors saved yet",
    emptyRecordsDesc: "Enter your first major in the calculator or load Algerian university demo data.",
    startFirstEvaluationBtn: "Assess First University Major",
    overallStatsTitle: "Aggregate University Reading Indicators",
    totalClassesLabel: "Total Majors",
    totalStudentsLabel: "Total Students",
    totalReadersLabel: "Total Readers",
    totalNonReadersLabel: "Total Non-Readers",
    overallPercentageLabel: "Overall Reading Rate",
    averageGradeLabel: "Average Academic Grade",
    bestClassLabel: "Top Reading Major",
    needsSupportClassLabel: "Major Needing Most Support",
    noDataYet: "No data available",
    searchPlaceholder: "Search major or faculty...",
    filterAll: "All appraisals",
    confirmDeleteTitle: "Confirm Deletion",
    confirmDeleteDesc: (className) => `Permanently delete major "${className}"?`,
    confirmDeleteAllTitle: "Confirm Clear All",
    confirmDeleteAllDesc: "All saved university major records will be permanently removed.",
    deleteBtn: "Delete",
    cancelBtn: "Cancel",
    exportJsonBtn: "Export Backup (JSON)",
    importJsonBtn: "Import File (JSON)",
    clearAllBtn: "Clear All Records",
    savedSuccessToast: "University major saved to records successfully!",
    updatedSuccessToast: "Major record updated successfully!",
    deletedSuccessToast: "Record deleted successfully.",
    reportTitle: "Official Academic & Pedagogical Report",
    reportSubtitle: "Printable document formatted for department heads, deans, and scientific councils",
    printBtn: "Print / Save as PDF",
    republicTitle: "People's Democratic Republic of Algeria",
    ministryTitle: "Ministry of Higher Education and Scientific Research",
    directorateTitle: "University / Faculty:",
    pedagogicalReportHeading: "Academic Statistical Report on Reading Practices in Algerian Higher Education",
    academicYearLabel: "Academic Year: 2025 / 2026",
    dateLabel: "Report Date:",
    inspectorSignature: "Scientific Council Chair Visa",
    principalSignature: "Faculty Dean Visa",
    teacherSignature: "Supervising Professor Signature",
    pedagogicalObservations: "Academic Observations & Recommendations",
    pedagogicalRecommendation: "Recommended actions include promoting SNDL digital resources, hosting campus book fairs, and embedding bibliographic research workshops into tutorials.",
    comparisonChartTitle: "Reading Rate Comparison Across University Majors",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    systemReady: "Ready",
    ratioComparison: "Comparative Group Breakdown",
    readersLabel: "Readers",
    nonReadersLabel: "Non-Readers",
  }
};
