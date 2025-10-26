
// ألوان مستوحاة من الصورة المرفقة
export const coffeeColors = {
  americano: "#1E1D1D", // لون أسود غامق
  mocha: "#5A4D41",    // لون بني مثل الموكا
  chai: "#7E6957",     // لون بني فاتح
  roast: "#867C70",    // لون بني متوسط
  brew: "#303031",     // لون رمادي داكن
  cream: "#D2C8B6",    // لون كريمي فاتح
  latte: "#E8DFD0",    // لون لاتيه فاتح جداً
  espresso: "#47392C", // لون إسبرسو داكن
  caramel: "#C19A6B",  // لون كراميل ذهبي
  cinnamon: "#9B6C43", // لون قرفة دافئ
  
  // إضافة ألوان جديدة
  darkRoast: "#2C2420", // بني داكن جداً
  vanilla: "#F0E6D6",   // لون فانيلا فاتح
  hazelnut: "#BB8F6A",  // لون بندق
  cappuccino: "#B69F8B", // لون كابتشينو
  macchiato: "#AD8865", // لون ماكياتو
  crema: "#E1C78F",     // لون كريمة القهوة
  gold: "#D4AF37",      // لون ذهبي للعناصر المميزة
  goldDark: "#A67C00",  // لون ذهبي غامق
  ivory: "#FFFFF0",     // لون عاجي فاتح
  paper: "#F5F1EA",     // لون ورقي فاتح
  
  // ألوان إضافية للتسويق
  coffeeBean: "#362419", // لون حبة البن
  latte_foam: "#FFF8E7", // لون رغوة اللاتيه
  cappuccino_foam: "#E5DBC1", // لون رغوة الكابتشينو
  turkish: "#4A3B2F", // لون القهوة التركية
  tiramisu: "#C8B79E", // لون حلوى التيراميسو
  honey: "#E4B363", // لون العسل
  maple: "#C37B41", // لون شراب القيقب
  
  // ألوان جديدة للتأثير البصري
  richBrown: "#3E2723", // بني غني للعناوين
  lightBeige: "#F5F0E5", // بيج فاتح للخلفيات
  warmGold: "#E6B980", // ذهبي دافئ للأزرار
  softTan: "#D7CCC8", // لون بني فاتح ناعم
  pearlWhite: "#F8F5F0", // أبيض لؤلؤي 
  deepBronze: "#8D6E63", // برونزي عميق
  duskBlue: "#5D4037", // أزرق مائل للبني
};

// تطبيق الألوان على عناصر الموقع
export const dentistryColors = {
  // الألوان الأساسية
  primary: coffeeColors.mocha,      // اللون الأساسي
  secondary: coffeeColors.chai,     // اللون الثانوي
  dark: coffeeColors.americano,     // اللون الغامق
  light: coffeeColors.cream,        // اللون الفاتح
  
  // ألوان خاصة
  gold: coffeeColors.gold,          // الذهبي (الأزرار والتأكيدات)
  darkGold: coffeeColors.goldDark,  // ذهبي غامق (تأثيرات التحويم)
  accent: coffeeColors.caramel,     // لون للتأكيد
  
  // ألوان الخلفيات
  background: coffeeColors.paper,   // لون الخلفية الرئيسي
  darkBackground: coffeeColors.brew, // لون الخلفية الداكنة
  
  // ألوان إضافية
  highlight: coffeeColors.cinnamon,  // لون للعناصر البارزة
  subtle: coffeeColors.latte,        // لون لطيف للعناصر الثانوية
  rich: coffeeColors.espresso,       // لون غني للعناوين المهمة
  
  // ألوان الحالات
  success: "#4CAF50",  // لون النجاح
  warning: "#FF9800",  // لون التحذير
  error: "#F44336",    // لون الخطأ
  info: "#2196F3",     // لون المعلومات
  
  // ألوان الحدود والظلال
  border: coffeeColors.latte,        // لون الحدود
  shadow: "rgba(0,0,0,0.1)",         // لون الظلال
  
  // ألوان النص
  textPrimary: coffeeColors.americano,    // لون النص الأساسي
  textSecondary: coffeeColors.mocha,      // لون النص الثانوي
  textLight: coffeeColors.cream,          // لون النص الفاتح
  textMuted: coffeeColors.chai,           // لون النص الخافت
  
  // ألوان إضافية للتطبيق
  black: coffeeColors.americano,      // لون أسود للتطبيق
  white: "#FFFFFF",                   // لون أبيض
  darkGray: coffeeColors.brew,        // لون رمادي داكن
  lightGray: coffeeColors.vanilla,    // لون رمادي فاتح
  
  // ألوان جديدة
  goldLight: coffeeColors.crema,      // ذهبي فاتح
  beige: coffeeColors.cappuccino,     // لون بيج
  softBrown: coffeeColors.macchiato,  // بني ناعم
  warmEspresso: coffeeColors.coffeeBean, // لون إسبرسو دافئ
  creamyWhite: coffeeColors.latte_foam, // أبيض كريمي
  honeyGold: coffeeColors.honey,      // ذهبي عسلي
  
  // ألوان تسويقية جديدة
  marketing: {
    primary: coffeeColors.richBrown,
    secondary: coffeeColors.warmGold,
    background: coffeeColors.lightBeige,
    accent: coffeeColors.deepBronze,
    light: coffeeColors.pearlWhite,
    dark: coffeeColors.duskBlue,
    soft: coffeeColors.softTan
  }
};

export default dentistryColors;
