const mongoose = require('mongoose');
const Governorate = require('../models/governorates.model');
require("dotenv").config()

const seedGovernoratesTable = async () => {
    try {
        console.log(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB to seed governorates');

        const governorates = [
            { name: 'القاهرة', english_name: 'Cairo', url: 'cairo', meta_title: 'القاهرة - عاصمة مصر', meta_description: 'اكتشف جمال وتاريخ القاهرة، عاصمة مصر وأكبر مدنها', h1_title: 'استكشف القاهرة: قلب مصر النابض' },
            { name: 'الجيزة', english_name: 'Giza', url: 'giza', meta_title: 'الجيزة - موطن الأهرامات', meta_description: 'زر الجيزة واستمتع بمشاهدة الأهرامات وأبو الهول', h1_title: 'الجيزة: أرض الحضارة الفرعونية' },
            { name: 'الإسكندرية', english_name: 'Alexandria', url: 'alexandria', meta_title: 'الإسكندرية - عروس البحر المتوسط', meta_description: 'استمتع بسحر الإسكندرية وشواطئها الخلابة وتاريخها العريق', h1_title: 'الإسكندرية: لؤلؤة البحر المتوسط' },
            { name: 'اسوان', english_name: 'Aswan', url: 'aswan', meta_title: 'أسوان - بوابة النوبة', meta_description: 'اكتشف جمال الطبيعة والآثار في أسوان جنوب مصر', h1_title: 'أسوان: جوهرة الجنوب المصري' },
            { name: 'اسيوط', english_name: 'Assiut', url: 'assiut', meta_title: 'أسيوط - عاصمة الصعيد', meta_description: 'تعرف على تاريخ وثقافة أسيوط في صعيد مصر', h1_title: 'أسيوط: قلب الصعيد النابض' },
            { name: 'الأقصر', english_name: 'Luxor', url: 'luxor', meta_title: 'الأقصر - متحف العالم المفتوح', meta_description: 'زر الأقصر واستمتع بمشاهدة أعظم الآثار الفرعونية', h1_title: 'الأقصر: كنوز مصر القديمة' },
            { name: 'الاسماعيلية', english_name: 'Ismailia', url: 'ismailia', meta_title: 'الإسماعيلية - مدينة الجمال والسحر', meta_description: 'اكتشف سحر الإسماعيلية على ضفاف قناة السويس', h1_title: 'الإسماعيلية: واحة الهدوء والجمال' },
            { name: 'البحر الاحمر', english_name: 'Red Sea', url: 'red-sea', meta_title: 'البحر الأحمر - جنة الغوص والاستجمام', meta_description: 'استمتع بشواطئ البحر الأحمر الساحرة ورياضة الغوص', h1_title: 'البحر الأحمر: روعة الطبيعة تحت الماء' },
            { name: 'البحيرة', english_name: 'Beheira', url: 'beheira', meta_title: 'البحيرة - أرض الخير والبركة', meta_description: 'اكتشف جمال الطبيعة والزراعة في محافظة البحيرة', h1_title: 'البحيرة: خضرة مصر وبركتها' },
            { name: 'الدقهلية', english_name: 'Dakahlia', url: 'dakahlia', meta_title: 'الدقهلية - أرض العلم والعلماء', meta_description: 'تعرف على تاريخ وثقافة الدقهلية في دلتا النيل', h1_title: 'الدقهلية: موطن العلم والحضارة' },
            { name: 'السويس', english_name: 'Suez', url: 'suez', meta_title: 'السويس - بوابة مصر الشرقية', meta_description: 'اكتشف أهمية السويس الاستراتيجية وتاريخها العريق', h1_title: 'السويس: ملتقى البحرين والقارات' },
            { name: 'الشرقية', english_name: 'Sharkia', url: 'sharkia', meta_title: 'الشرقية - أرض الفراعنة', meta_description: 'زر الشرقية واكتشف آثارها الفرعونية وتراثها الغني', h1_title: 'الشرقية: تاريخ مصر العريق' },
            { name: 'الغربية', english_name: 'Gharbia', url: 'gharbia', meta_title: 'الغربية - قلب الدلتا النابض', meta_description: 'تعرف على ثقافة وتراث محافظة الغربية في دلتا النيل', h1_title: 'الغربية: عبق التاريخ وروح الحاضر' },
            { name: 'الفيوم', english_name: 'Fayoum', url: 'fayoum', meta_title: 'الفيوم - واحة مصر الساحرة', meta_description: 'اكتشف جمال الطبيعة والآثار في واحة الفيوم', h1_title: 'الفيوم: جنة مصر الخضراء' },
            { name: 'القليوبية', english_name: 'Qaliubiya', url: 'qaliubiya', meta_title: 'القليوبية - بوابة القاهرة الشمالية', meta_description: 'تعرف على تاريخ وثقافة القليوبية شمال القاهرة', h1_title: 'القليوبية: تاريخ عريق وحاضر مشرق' },
            { name: 'المنوفية', english_name: 'Monufia', url: 'monufia', meta_title: 'المنوفية - أرض العلم والعلماء', meta_description: 'اكتشف تراث وثقافة المنوفية في دلتا النيل', h1_title: 'المنوفية: منارة العلم والمعرفة' },
            { name: 'المنيا', english_name: 'Minya', url: 'minya', meta_title: 'المنيا - عروس الصعيد', meta_description: 'زر المنيا واستمتع بجمال آثارها وطبيعتها الخلابة', h1_title: 'المنيا: كنوز مصر الوسطى' },
            { name: 'الوادي الجديد', english_name: 'New Valley', url: 'new-valley', meta_title: 'الوادي الجديد - واحة الصحراء الغربية', meta_description: 'اكتشف سحر الصحراء وجمال الواحات في الوادي الجديد', h1_title: 'الوادي الجديد: سحر الصحراء وجمال الواحات' },
            { name: 'بني سويف', english_name: 'Beni Suef', url: 'beni-suef', meta_title: 'بني سويف - بوابة الصعيد', meta_description: 'تعرف على تاريخ وثقافة بني سويف في صعيد مصر', h1_title: 'بني سويف: عراقة الماضي وإشراقة المستقبل' },
            { name: 'بورسعيد', english_name: 'Port Said', url: 'port-said', meta_title: 'بورسعيد - عروس البحر المتوسط', meta_description: 'اكتشف جمال وتاريخ بورسعيد على ساحل البحر المتوسط', h1_title: 'بورسعيد: بوابة مصر البحرية' },
            { name: 'جنوب سيناء', english_name: 'South Sinai', url: 'south-sinai', meta_title: 'جنوب سيناء - أرض الفيروز', meta_description: 'استمتع بجمال الطبيعة والشواطئ في جنوب سيناء', h1_title: 'جنوب سيناء: جنة السياحة والاستجمام' },
            { name: 'شمال سيناء', english_name: 'North Sinai', url: 'north-sinai', meta_title: 'شمال سيناء - بوابة مصر الشرقية', meta_description: 'اكتشف تاريخ وثقافة شمال سيناء وأهميتها الاستراتيجية', h1_title: 'شمال سيناء: تاريخ عريق وموقع استراتيجي' },
            { name: 'دمياط', english_name: 'Damietta', url: 'damietta', meta_title: 'دمياط - عروس النيل', meta_description: 'زر دمياط واستمتع بجمال شواطئها وصناعاتها التقليدية', h1_title: 'دمياط: فن الأثاث وسحر البحر' },
            { name: 'سوهاج', english_name: 'Sohag', url: 'sohag', meta_title: 'سوهاج - كنوز الصعيد', meta_description: 'اكتشف آثار وتراث سوهاج في صعيد مصر', h1_title: 'سوهاج: عبق التاريخ وأصالة الحاضر' },
            { name: 'قنا', english_name: 'Qena', url: 'qena', meta_title: 'قنا - عروس الصعيد', meta_description: 'تعرف على تاريخ وثقافة قنا في صعيد مصر', h1_title: 'قنا: أصالة الصعيد وعراقة التاريخ' },
            { name: 'كفر الشيخ', english_name: 'Kafr El Sheikh', url: 'kafr-el-sheikh', meta_title: 'كفر الشيخ - لؤلؤة الدلتا', meta_description: 'اكتشف جمال الطبيعة والزراعة في كفر الشيخ', h1_title: 'كفر الشيخ: خيرات الأرض وبركات النيل' },
            { name: 'مطروح', english_name: 'Matrouh', url: 'matrouh', meta_title: 'مطروح - جوهرة البحر المتوسط', meta_description: 'استمتع بشواطئ مطروح الساحرة وتراثها البدوي الأصيل', h1_title: 'مطروح: روعة الشواطئ وأصالة البادية' },
        ];

        await Governorate.insertMany(governorates);
        console.log('Governorates seeded successfully');
    } catch (error) {
        console.error('Error seeding governorates:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedGovernoratesTable();
module.exports = seedGovernoratesTable;
