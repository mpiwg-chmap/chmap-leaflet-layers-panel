const MPIWGLayerConfig = {
    label: '<span title="Land Survey Maps of China, 中国大陸五万分の一地図集成, 1:50000">Land Survey Maps</span>(<a href="http://www.mpiwg-berlin.mpg.de" target="_blank">MPIWG</a> <a href="https://history.sjtu.edu.cn/En" target="_blank">SJTU</a>) <span title="Display Layer/Move map/Copy Tileset/ Name"></span>',
    attribution: 'service provider: <a target="_blank" href="https://www.mpiwg-berlin.mpg.de/">MPIWG</a>',
    urlTmpl: 'https://chmap.mpiwg-berlin.mpg.de/${url}/{z}/{x}/{y}.png',
    layers: [
        { label: '遼寧 Liaoning', url: "liaoning", center: { lat: 39.823765135446436, lng: 122.3319697380066}},
        { label: '直隸 Zhili', url: "zhili", center: { lat: 39.554585263942144, lng: 117.12818384170534}},
        { label: '山西 Shanxi', url: "shanxi", center: { lat: 35.349777103399575, lng: 111.4178252220154}},
        { label: '陝西 Shaanxi', url: "shaanxi", center: { lat: 34.36943612505117, lng: 108.27269911766054}},
        { label: '綏遠  Suiyuan', url: "suiyuan", center: { lat: 41.10508122672498, lng: 108.88520300388338}},
        { label: '山東 Shandong', url: "shandong", center: { lat: 34.62782611200951, lng: 115.89546471834184}},
        { label: '江蘇 Jiangsu', url: "jiangsu", center: { lat: 33.131495831585724, lng: 120.03107428550722}},
        { label: '安徽 Anhui', url: "anhui", center: { lat: 31.81461170272378, lng: 117.30492632836105}},
        { label: '河南 Henan', url: "henan", center: { lat: 34.2274693054776, lng: 114.09410521388054}},
        { label: '浙江 Zhejiang', url: "zhejiang", center: { lat: 29.548670570330298, lng: 120.50388336181642}},
        { label: '江西 Jiangxi', url: "jiangxi", center: { lat: 28.741774254225945, lng: 115.70594787597658}},
        { label: '湖北 Hubei', url: "hubei", center: { lat: 30.49101172108476, lng: 113.59383165836336}},
        { label: '湖南 Hunan', url: "hunan", center: { lat: 27.822199586617096, lng: 112.39079117774965}},
        { label: '四川 Sichuan', url: "sichuan", center: { lat: 29.29224133637861, lng: 106.34282693266871}},
        { label: '福建 Fujian', url: "fujian", center: { lat: 25.83503645687178, lng: 118.69937896728516}},
        { label: '廣東 Guangdong', url: "guangdong", center: { lat: 22.971355162984544, lng: 112.94367760419847}},
        { label: '廣西 Guangxi', url: "guangxi", center: { lat: 23.86095235707954, lng: 109.5296895503998}},
        { label: '雲南 Yunnan', url: "yunnan", center: { lat: 24.109988279518042, lng: 103.89181109145287}},
        { label: '海南 Hainan', url: "hainan", center: { lat: 19.168929003464914, lng: 109.76565420627595}}
    ]
};

const SinicaLayerConfig = {
    label: '<span title="Land Survey Maps of China, 中国大陸五万分の一地図集成, 1:50000; 臺灣總督府 2萬分之1 臺灣堡圖">Land Survey Maps</span>(<a href="http://gissrv4.sinica.edu.tw/gis/cctslite.aspx" target="_blank">Academia Sinica</a>)',
    attribution: 'service provider: <a target="_blank" href="http://gis.rchss.sinica.edu.tw/">Academia Sinica</a>',
    urlTmpl: 'http://gis.sinica.edu.tw/${project}/file-exists.php?img=${img}-{z}-{x}-{y}',
    layers: [
        { label: "江蘇 Jiangsu", url: { project: "ccts", img: "China_50K_Jiangsu-png"} },
        { label: "安徽 Anhui", url: { project: "ccts", img: "China_50K_Anhui-png"} },
        { label: "河北 Hebei", url: { project: "ccts", img: "China_50K_Hebei-png"} },
        { label: "河南 Henan", url: { project: "ccts", img: "China_50K_Henan-png"} },
        { label: "山東 Shandong", url: { project: "ccts", img: "China_50K_Shandong-png"} },
        { label: "浙江 Zhejiang", url: { project: "ccts", img: "China_50K_Zhejiang-png"} },
        { label: "福建 Fujian", url: { project: "ccts", img: "China_50K_Fujian-png"} },
        { label: "台灣堡圖 Taiwan", url: { project: "ccts", img: "JM20K_1904-jpg;tileserver"} },
    ]
};

const CHGISLayerConfig = {
    label: 'Chinese Historical Layers (<a href="http://chgis.fas.harvard.edu/" target="_blank">CHGIS</a>)',
    attribution:  '&copy; <a href="http://chgis.fas.harvard.edu/" target="_blank">CHGIS</a> contributors',
    urlTmpl: '${url}',
    layers: [
        { label: "China 1911", url: "https://chmap.mpiwg-berlin.mpg.de/t/China1911/{z}/{x}/{y}.png" },
        { label: "China 1820 Province", url: "https://logart.mpiwg-berlin.mpg.de/ts/re.php?l=China_1820_prov_pgn-{z}-{x}-{y}-png" },
        { label: "China 1820 Province name", url: "https://logart.mpiwg-berlin.mpg.de/ts/re.php?l=China_1820_prov_pts-{z}-{x}-{y}-png" },
        { label: "China 1820 Prefecture", url: "https://logart.mpiwg-berlin.mpg.de/ts/re.php?l=China_1820_pref_pgn-{z}-{x}-{y}-png" },
        { label: "China 1820 Prefecture name", url: "https://logart.mpiwg-berlin.mpg.de/ts/re.php?l=China_1820_pref_pts-{z}-{x}-{y}-png" },
        { label: "China 1820 county name", url: "https://logart.mpiwg-berlin.mpg.de/ts/re.php?l=China_1820_county_pts-{z}-{x}-{y}-png" },
        { label: "China 1820 town name", url: "https://logart.mpiwg-berlin.mpg.de/ts/re.php?l=China_1820_twn_pts-{z}-{x}-{y}-png" }
    ]
};

export { MPIWGLayerConfig, SinicaLayerConfig, CHGISLayerConfig };
