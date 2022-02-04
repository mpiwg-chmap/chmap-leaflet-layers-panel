const baseLayers = [
    {
        name: "World Terrain",
        label: "World Terrain (MPIWG)",
        url: "http://www.ihp.sinica.edu.tw/~bronze/t/bg/{z}/{x}/{y}.png",
        attribution: '&copy; <a target="_blank" href="http://bronzevessel.appspot.com/">The Bronze Vessels GIS @ Institute of History and Philology, Academia Sinica</a>, Data Sources:<a target="_blank" href="https://gadm.org/download_country_v3.html"> China</a>/<a href="http://gaia.geosci.unc.edu/rivers/">Rivers</a>,<span class="fb"> Tileset url:<span style="color:blue">http://www.ihp.sinica.edu.tw/~bronze/t/bg/{z}/{x}/{y}.png</span>',
    },
    {
        name: "Chinese Provinces",
        label: "Chinese Provinces (ihp@Sinica)",
        url: "http://www.ihp.sinica.edu.tw/~bronze/t/bg/{z}/{x}/{y}.png",
        attribution: '&copy; <a target="_blank" href="http://bronzevessel.appspot.com/">The Bronze Vessels GIS @ Institute of History and Philology, Academia Sinica</a>, Data Sources:<a target="_blank" href="https://gadm.org/download_country_v3.html"> China</a>/<a href="http://gaia.geosci.unc.edu/rivers/">Rivers</a>,<span class="fb"> Tileset url:<span style="color:blue">http://www.ihp.sinica.edu.tw/~bronze/t/bg/{z}/{x}/{y}.png</span>',
    },
    {
        name: "Carto Positron",
        label: "Carto Positron",
        url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        attribution: '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    },
    {
        name: "Esri.NatGeoWorldMap",
        label: "NatGeo World Map (ESRI)",
        provider: "Esri.WorldImagery",

    },
    {
        name: "Esri.World Topo Map",
        label: "World Topo Map (ESRI)",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attribution: 'Tiles Â© <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
    },
    {
        name: "HikeBike.HikeBike",
        label: "HikeBike.HikeBike",
        provider: 'HikeBike.HikeBike',
    },
    {
        name: "OpenStreetMap",
        label: "OpenStreetMap",
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
    {
        name: "Stamen.Terrain",
        label: "Terrain with Labes (Stamen)",
        url: "https://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
        attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> â€” Map data Â© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tileset url:<span style="color:blue">https://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png</span>',
    },
    {
        name: "Stamen.TerrainBackground",
        label: "Terrain Background (Stamen)",
        url: "https://stamen-tiles-a.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png",
        attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> â€” Map data Â© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tileset url:<span style="color:blue">https://stamen-tiles-a.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png</span>',
    },
];
/*
    {
    name: 'toner',
    label: '',
    url: "http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png"
    attribution: 'Map tiles by <a target="_blank" href="http://stamen.com">Stamen Design</a>, under <a target="_blank" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_blank" href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    },
    {
    name: 'Stamen.Watercolor'
    label: 'Stamen Watercolor',
    provider: "Stamen.Watercolor",
    },
    {
    name: 'Stamen.Terrain'
    label: 'Stamen Terrain',
    provider: "Stamen.Terrain",
    },
    {
    name: 'OpenMapSurfer.Roads'
    label: 'OpenMapSurfer Roads,
    provider: "OpenMapSurfer.Roads",
    },
    {
    name: 'Esri.NatGeoWorldMap'
    label: 'NatGeo World (ESRI)',
    provider: "Esri.NatGeoWorldMap",
    },
    {
    name: 'Esri.WorldGrayCanvas'
    label: 'World GrayCanvas (ESRI)',
    provider: 'Esri.WorldGrayCanvas',
    },
    {
    name: 'OpenTopoMap'
    label: 'OpenTopoMap',
    provider: 'OpenTopoMap'
    },
    {
    name: 'Topographic - OSM'
    label: 'OpenMapSurfer.Roads',
    provider: 'OpenMapSurfer.Roads',
    },
*/

export default baseLayers;
