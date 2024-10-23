const mongoose = require("mongoose");
const City = require("../models/cities.model");
const Governorate = require("../models/governorates.model");
require("dotenv").config()
const seedCities = async () => {
  try {
     await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB to seed cities');

    const createDistricts = async (governorate, districts) => {
      for (const district of districts) {
        await City.create({
         governorate_id: governorate._id,
          name: district.name,
          url: district.url,
        });
      }
    };

//Cities Data


const aswan = await Governorate.findOne({ name: "اسوان" });
if (aswan) {
  await createDistricts(aswan, [
    { name: " مدينة اسوان", url: "aswan-city" },
    { name: "كوم امبو", url: "kom-ombo" },
    { name: "ابو الريش", url: "abu-el-rish" },
    { name: "نصر النوبة", url: "nasr-el-nuba" },
    { name: "دراو", url: "daraw" },
    { name: "ابو سمبل", url: "abu-simbel" },
    { name: "ادفو", url: "edfu" },
    { name: "البصيلية", url: "el-basilia" },
    { name: "الرديسية", url: "el-radisiya" },
    { name: "السباعية", url: "el-sabaiya" },
    { name: "صحاري", url: "sahari" },
    { name: "كلابشة", url: "kalabsha" },
  ]);
}

const assiut = await Governorate.findOne({ name: "اسيوط" });
if (assiut) {
  await createDistricts(assiut, [
    { name: "مدينة اسيوط", url: "assiut-city" },
    { name: "اسيوط الجديدة", url: "new-assiut" },
    { name: "الفتح", url: "el-fateh" },
    { name: "منفلوط", url: "منفلوط" },
    { name: "صدفا", url: "sedfa" },
    { name: "أبنوب", url: "abnoub" },
    { name: "أبو تيج", url: "abu-tig" },
    { name: "البداري", url: "el-badari" },
    { name: "الغنايم", url: "el-ghanaim" },
    { name: "القوصية", url: "el-qusiya" },
    { name: "ديروط", url: "deyrout" },
    { name: "ساحل سليم", url: "sahel-selim" },
  ]);
}

const luxor = await Governorate.findOne({ name: "الأقصر" });
if (luxor) {
  await createDistricts(luxor, [
    { name: "مدينة الأقصر", url: "luxor-city" },
    { name: "الزينية", url: "el-zeiniya" },
    { name: "الطود", url: "el-toud" },
    { name: "أرمنت", url: "armant" },
    { name: "إسنا", url: "esna" },
    { name: "البياضية", url: "el-bayadiya" },
    { name: "القرنة", url: "el-qurna" },
    { name: "طيبة الجديدة", url: "new-thebes" },
  ]);
}

const ismailia = await Governorate.findOne({ name: "الاسماعيلية" });
if (ismailia) {
  await createDistricts(ismailia, [
    { name: "مدينة الاسماعيلية", url: "ismailia-city" },
    { name: "فايد", url: "fayed" },
    { name: "أبوصوير", url: "abu-suweir" },
    { name: "القنطرة شرق", url: "el-qantara-sharq" },
    { name: "التل الكبير", url: "el-tal-el-kebir" },
    { name: "القصاصين", url: "el-qassaseen" },
    { name: "القنطرة غرب", url: "el-qantara-gharb" },
  ]);
}

const redSea = await Governorate.findOne({ name: "البحر الاحمر" });
if (redSea) {
  await createDistricts(redSea, [
    { name: "الغردقة", url: "hurghada" },
    { name: "الجونة", url: "el-gouna" },
    { name: "سهل حشيش", url: "sahel-hashish" },
    { name: "مرسي علم", url: "marsa-alam" },
    { name: "سفاجا", url: "safaga" },
    { name: "القصير", url: "el-quseir" },
    { name: "حلايب وشلاتين", url: "halayeb-and-shalatin" },
    { name: "رأس غارب", url: "ras-ghareb" },
  ]);
}

const beheira = await Governorate.findOne({ name: "البحيرة" });
if (beheira) {
  await createDistricts(beheira, [
    { name: "دمنهور", url: "damanhour" },
    { name: "كفر الدوار", url: "kafr-el-dawar" },
    { name: "ايتاي البارود", url: "itay-el-baroud" },
    { name: "رشيد", url: "rashid" },
    { name: "بدر", url: "badr" },
    { name: "أبو المطامير", url: "abu-el-matamir" },
    { name: "أبو حمص", url: "abu-homs" },
    { name: "إدكو", url: "idku" },
    { name: "الدلنجات", url: "delengat" },
    { name: "الرحمانية", url: "el-rahmaneya" },
    { name: "المحمودية", url: "el-mahmoudiya" },
    { name: "النوبارية الجديدة", url: "new-nubaria" },
    { name: "حوش عيسي", url: "hosh-issa" },
    { name: "شبراخيت", url: "shubra-khit" },
    { name: "كوم حمادة", url: "kom-hamada" },
    { name: "وادي النطرون", url: "wadi-el-natrun" },
  ]);
}

const giza = await Governorate.findOne({ name: "الجيزة" });
if (giza) {
  await createDistricts(giza, [
    { name: "6 اكتوبر", url: "6th-of-october" },
    { name: "الشيخ زايد", url: "sheikh-zayed" },
    { name: "حدائق 6 اكتوبر", url: "gardens-of-6th-of-october" },
    { name: "فيصل", url: "faisal" },
    { name: "حدائق الاهرام", url: "pyramids-gardens" },
    { name: "أبو رواش", url: "abu-rawash" },
    { name: "أرض اللواء", url: "ard-el-lewa" },
    { name: "أوسيم", url: "ossim" },
    { name: "إمبابة", url: "imbaba" },
    { name: "البدرشين", url: "el-badrasheen" },
    { name: "البراجيل", url: "el-barajil" },
    { name: "الحوامدية", url: "el-hawamdiya" },
    { name: "الدقي", url: "el-dokki" },
    { name: "الصف", url: "el-saf" },
    { name: "العجوزة", url: "el-agouza" },
    { name: "العياط", url: "el-ayat" },
    { name: "الكيت كات", url: "kit-kat" },
    { name: "المنصورية", url: "el-mansouriya" },
    { name: "المنيب", url: "el-moneeb" },
    { name: "الهرم", url: "el-haram" },
    { name: "الوراق", url: "el-warraq" },
    { name: "بشتيل", url: "basateem" },
    { name: "بولاق الدكرور", url: "bolaq-el-dakrour" },
    { name: "ترسا", url: "tersa" },
    { name: "جزيرة الدهب وكولدير", url: "el-dahb-and-coldair-island" },
    { name: "حي الجيزة", url: "giza-district" },
    { name: "دهشور", url: "dahshur" },
    { name: "صفط اللبن", url: "saff-el-laban" },
    { name: "غرب سوميد", url: "west-somas" },
    { name: "كرداسة", url: "kerdasa" },
    { name: "مركز الجيزة", url: "giza-center" },
    { name: "مريوطية", url: "mariutiyyah" },
    { name: "منيل شيحة", url: "manial-sheeha" },
    { name: "ناهيا", url: "nahia" },
  ]);
}

const dakahlia = await Governorate.findOne({ name: "الدقهلية" });
if (dakahlia) {
  await createDistricts(dakahlia, [
    { name: "المنصورة", url: "mansoura" },
    { name: "جمصه", url: "gamasah" },
    { name: "المنصورة الجديدة", url: "new-mansoura" },
    { name: "طلخا", url: "talkha" },
    { name: "ميت غمر", url: "mit-ghamr" },
    { name: "أجا", url: "aga" },
    { name: "أخطاب", url: "akhtab" },
    { name: "السنبلاوين", url: "el-sinbillawin" },
    { name: "الكردي", url: "el-kurdi" },
    { name: "المنزلة", url: "el-manzelah" },
    { name: "بلقاس", url: "belqas" },
    { name: "بني عبيد", url: "bani-obeid" },
    { name: "تمي الامديد", url: "tami-el-amdid" },
    { name: "دكرنس", url: "dekernes" },
    { name: "شريين", url: "sherbin" },
    { name: "مركز الجمالية", url: "el-gamaliya-center" },
    { name: "مركز المطرية", url: "el-matariya-center" },
    { name: "منية النصر", url: "mantya-en-nasr" },
    { name: "ميت سلسيل", url: "mit-salsil" },
    { name: "نبروه", url: "nabaroh" },
  ]);
}

const gharbia = await Governorate.findOne({ name: "الغربية" });
if (gharbia) {
  await createDistricts(gharbia, [
    { name: "طنطا", url: "tanta" },
    { name: "المحلة الكبري", url: "el-mahalla-el-kubra" },
    { name: "كفر الزيات", url: "kafr-el-zayat" },
    { name: "السنطة", url: "el-santa" },
    { name: "بسيون", url: "basion" },
    { name: "زفتي", url: "zefta" },
    { name: "سمنود", url: "samanoud" },
    { name: "قطور", url: "qutour" },
  ]);
}

const sharqia = await Governorate.findOne({ name: "الشرقية" });
if (sharqia) {
  await createDistricts(sharqia, [
    { name: "العاشر من رمضان", url: "tenth-of-ramadan" },
    { name: "الزقازيق", url: "zagazig" },
    { name: "منيا القمح", url: "minya-el-qamh" },
    { name: "فاقوس", url: "faqous" },
    { name: "بلبيس", url: "belbeis" },
    { name: "أبو حماد", url: "abu-hammad" },
    { name: "أبو كبير", url: "abu-kabir" },
    { name: "أولاد صقر", url: "awlad-saqr" },
    { name: "الإبراهيمية", url: "el-ibrahimiya" },
    { name: "الحسينية", url: "el-husseiniya" },
    { name: "الصالحية الجديدة", url: "new-salheya" },
    { name: "القرين", url: "el-qarnin" },
    { name: "القنايات", url: "el-qanayat" },
    { name: "ديرب نجم", url: "deirb-negm" },
    { name: "كفر صقر", url: "kafr-sakr" },
    { name: "مشتول السوق", url: "mishtol-el-souq" },
    { name: "ههيا", url: "hehia" },
  ]);
}

const cairo = await Governorate.findOne({ name: "القاهرة" });
if (cairo) {
  await createDistricts(cairo, [
    { name: "القاهرة الجديدة", url: "new-cairo" },
    { name: "التجمع الخامس", url: "fifth-settlement" },
    { name: "مدينتي", url: "madinaty" },
    {
      name: "العاصمة الإدارية الجديدة",
      url: "new-administrative-capital",
    },
    { name: "مدينة نصر", url: "nasr-city" },
    { name: "مدينة الشروق", url: "shorouk-city" },
    { name: "الأميرية", url: "el-amiriya" },
    { name: "البساتين", url: "el-basateen" },
    { name: "التبين", url: "el-tebin" },
    { name: "الجمالية", url: "el-gamaliya" },
    { name: "الحلمية الجديدة", url: "new-helmiya" },
    { name: "الدراسة", url: "el-darrasa" },
    { name: "الدرب الأحمر", url: "el-darb-el-ahmar" },
    { name: "الزاوية الحمراء", url: "el-zawya el-hamra" },
    { name: "الزمالك", url: "el-zamalek" },
    { name: "السيدة زينب", url: "sayeda-zeinab" },
    { name: "الشرابية", url: "el-shubra" },
    { name: "العباسية", url: "el-abbaseya" },
    { name: "العبور", url: "el-obour" },
    { name: "العتبة", url: "el-attaba" },
    { name: "الفسطاط", url: "el-fustat" },
    { name: "القطامية", url: "el-qatamiya" },
    { name: "الماظة", url: "almaza" },
    { name: "المرج", url: "el-marg" },
    { name: "المطرية", url: "el-matarriya" },
    { name: "المعادي", url: "el-maadi" },
    { name: "المعصرة", url: "el-masara" },
    { name: "المقطم", url: "el-moqattam" },
    { name: "المنيل", url: "el-munib" },
    { name: "الموسكي", url: "el-mousky" },
    { name: "النزهة الجديدة", url: "new-nozha" },
    { name: "الوايلي", url: "el-waili" },
    { name: "باب الشعرية", url: "bab-el-sharia" },
    { name: "بولاق", url: "boulaq" },
    { name: "جاردن سيتي", url: "garden-city" },
    { name: "جسر السويس", url: "gasr-el-nil" },
    { name: "حدائق القبة", url: "hadayek-el-qobba" },
    { name: "حدائق حلوان", url: "hadayek-helwan" },
    { name: "حلمية الزيتون", url: "helmiet-el-zaytoun" },
    { name: "حلوان", url: "helwan" },
    { name: "دار السلام", url: "dar-elsalam" },
    { name: "رمسيس وامتداد رمسيس", url: "ramses-and-ramses-extension" },
    { name: "روض الفرج", url: "rod-el-farag" },
    { name: "زهراء المعادي", url: "maadi-zahraa" },
    { name: "شبرا", url: "shubra" },
    { name: "شيراتون", url: "sheraton" },
    { name: "طرة", url: "tura" },
    { name: "عزبة النخل", url: "ezbet-el-nakhl" },
    { name: "عين شمس", url: "ain-shams" },
    { name: "قصر النيل", url: "qasr-el-nil" },
    { name: "مدينة 15 مايو", url: "15-may-city" },
    { name: "الرحاب", url: "el-rehab" },
    { name: "مدينة السلام", url: "madinat-es-salam" },
    { name: "مدينة المستقبل", url: "madinat-el-mostaqbal" },
    { name: "مدينة بدر", url: "badr-city" },
    { name: "مصر الجديدة", url: "new-cairo-city" },
    { name: "مصر القديمة", url: "old-cairo" },
    { name: "هليوبوليس الجديدة", url: "new-heliopolis" },
    { name: "وسط البلد", url: "downtown" },
  ]);
}

const qalyubia = await Governorate.findOne({ name: "القليوبية" });
if (qalyubia) {
  await createDistricts(qalyubia, [
    { name: "شبرا الخيمة", url: "shubra-el-kheima" },
    { name: "بنها", url: "banha" },
    { name: "الخصوص", url: "el-khosos" },
    { name: "بهتيم", url: "bahteem" },
    { name: "مسطرد", url: "mostorod" },
    { name: "الخانكة", url: "el-khanka" },
    { name: "القناطر الخيرية", url: "el-qanater-el-khairiya" },
    { name: "شبين القناطر", url: "shubeen-el-qanater" },
    { name: "طوخ", url: "tookh" },
    { name: "قليوب", url: "qaliub" },
    { name: "قها", url: "qaha" },
    { name: "كفر شكر", url: "kafr-shokr" },
  ]);
}

const menoufia = await Governorate.findOne({ name: "المنوفية" });
if (menoufia) {
  await createDistricts(menoufia, [
    { name: " شبين الكوم", url: "shubeen-el-kom" },
    { name: "السادات", url: "el-sadat" },
    { name: "قويسنا", url: "quesna" },
    { name: "منوف", url: "menouf" },
    { name: "بركة السبع", url: "barket-el-saba" },
    { name: "أشمون", url: "ashmoun" },
    { name: "الباجور", url: "el-bagor" },
    { name: "الشهداء", url: "el-shohada" },
    { name: "تلا", url: "tala" },
    { name: "سرس الليان", url: "sers-ellailan" },
  ]);
}

const minya = await Governorate.findOne({ name: "المنيا" });
if (minya) {
  await createDistricts(minya, [
    { name: "مدينة المنيا", url: "minya-city" },
    { name: "المنيا الجديدة", url: "new-minya" },
    { name: "بني مزار", url: "bani-mazar" },
    { name: "مغاغة", url: "maghaghah" },
    { name: "ملوي", url: "mallawi" },
    { name: "أبو قرقاص", url: "abu-qurqas" },
    { name: "العدوة", url: "el-adwa" },
    { name: "دير مواس", url: "deir-mawas" },
    { name: "سمالوط", url: "samalut" },
    { name: "مطاي", url: "matay" },
  ]);
}

const beniSuef = await Governorate.findOne({ name: "بني سويف" });
if (beniSuef) {
  await createDistricts(beniSuef, [
    { name: "مدينة بني سويف", url: "beni-suef-city" },
    { name: "بني سويف الجديدة", url: "new-beni-suef" },
    { name: "الفشن", url: "el-fashn" },
    { name: "الواسطي", url: "el-wasty" },
    { name: "ناصر", url: "naser" },
    { name: "إهناسيا", url: "ihnasia" },
    { name: "ببا", url: "beba" },
    { name: "سمسطا", url: "sumusta" },
  ]);
}

const portSaid = await Governorate.findOne({ name: "بورسعيد" });
if (portSaid) {
  await createDistricts(portSaid, [
    { name: "حي الزهور", url: "el-zohour-district" },
    { name: "حي الشرق", url: "el-sharq-district" },
    { name: "حي الضواحي", url: "el-dwahy-district" },
    { name: "مدينة بورفؤاد", url: "port-fouad-city" },
    { name: "حي المناخ", url: "el-menatiq-district" },
    { name: "حي الجنوب", url: "el-ganub-district" },
    { name: "حي العرب", url: "el-arab-district" },
  ]);
}

const southSinai = await Governorate.findOne({ name: "جنوب سيناء" });
if (southSinai) {
  await createDistricts(southSinai, [
    { name: "شرم الشيخ", url: "sharm-el-sheikh" },
    { name: "راس سدر", url: "ras-sedr" },
    { name: "دهب", url: "dahab" },
    { name: "طور سيناء", url: "tor-sinai" },
    { name: "أبو رديس", url: "abu-rdeis" },
    { name: "أبو زنيمة", url: "abu-zenaima" },
    { name: "سانت كاترين", url: "saint-catherine" },
    { name: "طابا", url: "taba" },
    { name: "نويبع", url: "nuweiba" },
  ]);
}

const damietta = await Governorate.findOne({ name: "دمياط" });
if (damietta) {
  await createDistricts(damietta, [
    { name: "دمياط الجديدة", url: "new-damietta" },
    { name: "مدينة دمياط", url: "damietta-city" },
    { name: "رأس البر", url: "ras-el-bar" },
    { name: "كفر البطيخ", url: "kafr-el-batikh" },
    { name: "فارسكور", url: "faraskour" },
    { name: "الزرقا", url: "el-zarqa" },
    { name: "السرو", url: "el-saru" },
    { name: "عزبة البرج", url: "ezbet-el-borg" },
    { name: "كفر سعد", url: "kafr-saad" },
    { name: "مركز الروضة", url: "el-rawdah-center" },
    { name: "ميت أبو غالب", url: "mit-abou-ghalib" },
  ]);
}

const sohag = await Governorate.findOne({ name: "سوهاج" });
if (sohag) {
  await createDistricts(sohag, [
    { name: "مركز سوهاج", url: "sohag-center" },
    { name: "سوهاج الجديدة", url: "new-sohag" },
    { name: "أخميم", url: "akhmeem" },
    { name: "جرجا", url: "girga" },
    { name: "طهطا", url: "tahta" },
    { name: "البلينا", url: "el-balina" },
    { name: "العسيرات", url: "el-usairat" },
    { name: "المراغة", url: "el-maragha" },
    { name: "المنشاة", url: "el-menshaa" },
    { name: "ساقلتة", url: "saqulta" },
    { name: "طما", url: "tama" },
    { name: "مركز جهينة", url: "jahina-center" },
    { name: "مركز دار السلام", url: "dar-el-salam-center" },
  ]);
}

const northSinai = await Governorate.findOne({ name: "شمال سيناء" });
if (northSinai) {
  await createDistricts(northSinai, [
    { name: "الحسنة", url: "el-hasana" },
    { name: "العريش", url: "arish" },
    { name: "رفح", url: "rafah" },
    { name: "الشيخ زويد", url: "sheikh-zuweid" },
    { name: "بئر العبد", url: "bir-al-abd" },
    { name: "نخل", url: "nakhl" },
  ]);
}

const qena = await Governorate.findOne({ name: "قنا" });
if (qena) {
  await createDistricts(qena, [
    { name: "مدينة قنا", url: "qena-city" },
    { name: "نجع حمادي", url: "nag-hammadi" },
    { name: "قفط", url: "qift" },
    { name: "أبو تشت", url: "abu-tesht" },
    { name: "الوقف", url: "el-waqf" },
    { name: "دشنا", url: "deshna" },
    { name: "فرشوط", url: "farshout" },
    { name: "قوص", url: "qous" },
    { name: "نقادة", url: "naqada" },
  ]);
}

const matrouh = await Governorate.findOne({ name: "مطروح" });
if (matrouh) {
  await createDistricts(matrouh, [
    { name: "الساحل الشمالي", url: "north-coast" },
    { name: "الحمام", url: "el-hammam" },
    { name: "النجيلة", url: "el-nagiela" },
    { name: "السلوم", url: "el-sallum" },
    { name: "الضبعة", url: "el-dabaa" },
    { name: "براني", url: "barrani" },
    { name: "سيوة", url: "siwa" },
    { name: "مرسي مطروح", url: "marsa-matruh" },
    { name: "العلمين", url: "el-alamein" },
  ]);
}

const faiyum = await Governorate.findOne({ name: "الفيوم" });
if (faiyum) {
  await createDistricts(faiyum, [
    { name: "مدينة الفيوم", url: "faiyum-city" },
    { name: "يوسف الصديق", url: "yusuf-el-siddiq" },
    { name: "الفيوم الجديدة", url: "new-faiyum" },
    { name: "طامية", url: "tamiya" },
    { name: "سنورس", url: "snoras" },
    { name: "أطسا", url: "atsa" },
    { name: "إبشواي", url: "ibshway" },
  ]);
}

const kafrElSheikh = await Governorate.findOne({ name: "كفر الشيخ" });
if (kafrElSheikh) {
  await createDistricts(kafrElSheikh, [
    { name: "مدينة كفر الشيخ", url: "kafr-el-sheikh-city" },
    { name: "بلطيم", url: "balteem" },
    { name: "دسوق", url: "desouq" },
    { name: "الحامول", url: "el-hamool" },
    { name: "قلين", url: "qallin" },
    { name: "البرلس", url: "el-burullus" },
    { name: "الرياض", url: "el-riyad" },
    { name: "بيلا", url: "bella" },
    { name: "سيدي سالم", url: "sidi-salim" },
    { name: "فوه", url: "fouh" },
    { name: "مطوبس", url: "matrobus" },
  ]);
}

const newValley = await Governorate.findOne({ name: "الوادي الجديد" });
if (newValley) {
  await createDistricts(newValley, [
    { name: "الخارجة", url: "el-kharga" },
    { name: "مدينة موط", url: "mut-city" },
    { name: "الداخلة", url: "el-dakhla" },
    { name: "الفرافرة", url: "el-farafra" },
    { name: "باريس", url: "paris" },
    { name: "بلاط", url: "balat" },
  ]);
}

const suez = await Governorate.findOne({ name: "السويس" });
if (suez) {
  await createDistricts(suez, [
    { name: "مدينة السويس", url: "suez-city" },
    { name: "الاربعين", url: "el-arbaeen" },
    { name: "فيصل", url: "faisall" },
    { name: "بورتوفيق", url: "port-tawfiq" },
    { name: "الجناين", url: "el-ganayeen" },
    { name: "عتاقة", url: "ataka" },
    { name: "مدينة السويس الجديدة", url: "new-suez-city" },
  ]);
}

const alex = await Governorate.findOne({ name: "الإسكندرية" });
if (alex) {
  await createDistricts(alex, [
    { name: "عجمي", url: "agamy" },
    { name: "النخيل", url: "nakheel" },
    { name: "سموحة", url: "smouha" },
    { name: "سيدي بشر", url: "sidi-bishr" },
    { name: "ميامي", url: "miami" },
    { name: "أبو تلات", url: "abu-talat" },
    { name: "أبو قير", url: "abu-qir" },
    { name: "الأزاريطة", url: "azareeta" },
    { name: "الابراهيمية", url: "ibrahimiya" },
    { name: "الجمرك", url: "gomrok" },
    { name: "الحضرة", url: "hadra" },
    { name: "الدخيلة", url: "dekheila" },
    { name: "السيوف", url: "seouf" },
    { name: "الصالحية", url: "salheya" },
    { name: "الظاهرية", url: "dahiria" },
    { name: "العامرية", url: "ameriya" },
    { name: "العصافرة", url: "asafera" },
    { name: "العطارين", url: "attarin" },
    { name: "العوايد", url: "awayed" },
    { name: "القباري", url: "qabbary" },
    { name: "اللبان", url: "laban" },
    { name: "المعمورة", url: "maamoura" },
    { name: "المكس", url: "max" },
    { name: "المنتزه", url: "montaza" },
    { name: "المندرة", url: "mandara" },
    { name: "المنشية", url: "mansheya" },
    { name: "الورديان", url: "wardian" },
    { name: "باكوس", url: "bakous" },
    { name: "بحري والأنفوشي", url: "bahary-anfoushy" },
    { name: "برج العرب", url: "borg-el-arab" },
    { name: "بولكلي", url: "bolkly" },
    { name: "جليم", url: "gleem" },
    { name: "جناكليس", url: "gianaklis" },
    { name: "رأس التين", url: "ras-el-teen" },
    { name: "رشدي", url: "rushdi" },
    { name: "زيزينيا", url: "zezenia" },
    { name: "سابا باشا", url: "saba-pasha" },
    { name: "سان ستيفانو", url: "san-stefano" },
    { name: "سبورتنج", url: "sporting" },
    { name: "ستانلي", url: "stanley" },
    { name: "سيدي جابر", url: "sidi-gaber" },
    { name: "شاطبي", url: "shatby" },
    { name: "شدس", url: "shads" },
    { name: "فلمنج", url: "fleming" },
    { name: "فيكتوريا", url: "victoria" },
    { name: "كامب شيراز", url: "camp-sheraz" },
    { name: "كرموز", url: "karmouz" },
    { name: "كفر عبدو", url: "kafr-abdo" },
    { name: "كليوباترا", url: "cleopatra" },
    { name: "كوم الدكة", url: "kom-el-dikka" },
    { name: "لوران", url: "loran" },
    { name: "محرم بك", url: "moharam-bey" },
    { name: "محطة الرمل", url: "mahatet-el-raml" },
    { name: "الهانوفيل", url: "hanoufil" },
    { name: "حي اول المنتزة", url: "first-montaza-district" },
    { name: "حي ثان المنتزة", url: "second-montaza-district" },
    { name: "حي الجمرك", url: "gomrok-district" },
    { name: "حي غرب", url: "west-district" },
    { name: "فكتوريا", url: "vectori" },
    { name: "منشأة جانكليس", url: "manshia-ganaklis" },
  ]);
}

    console.log("Cities seeded successfully");
  } catch (error) {
    console.error("Error seeding cities:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedCities()

module.exports = seedCities;
