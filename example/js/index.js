const { MapLayersController } = window.chmapLeafletLayersPanel;

function initMap() {

    MapLayersController.init();

}

function initToolbar(){

    const toolbar = document.getElementById('toolbar');

    MapLayersController.hookShowMapLayerListTo(toolbar.querySelector('#layers-toggle-btn'));

}

document.addEventListener("DOMContentLoaded", (event) => {

    initMap();

    initToolbar();

});
