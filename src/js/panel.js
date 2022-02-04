
import { Constants, Commons, BootstrapWrap } from "@chmap/utilities";
import { DistortableImageLayer } from "@chmap/leaflet-extensions";

const { Offcanvas, Collapse } = BootstrapWrap;

const MapLayersPanel = function() {

    const {GEO_REF_IMG_SIZE} = Constants;

    const { SnowflakeID } = Commons;

    const localEventEmitter = new Commons.EventEmitterClass();

    let localMap = null;

    let panel = null;

    let panelBody = null;

    const gBaseLayers = [];

    const rawOverLayers = [];

    const usersLayers = [];

    let gDefaultLayer = null;

    let gYourLayerBody = null;

    function addEventListener(obj, types, fn, context) {
        localEventEmitter.on(obj, types, fn, context);
    }

    function init(map, baseLayers, defaultLayer, overLayers) {

        localMap = map;

        gDefaultLayer = defaultLayer;

        createUI();

        bindPointersAndEvents();

        renderList(baseLayers, overLayers);

        bindDataNodeEvent();

    }

//===== UI: Offcanvas ==

    function createUI() {

        const div = document.createElement('div');

        //TODO: Highly coupling with a UI library
        const html =
`<div id="mapLayerListOffCanvas"
     class="offcanvas offcanvas-end"
     style="width:320px;font-size:11pt;"
     data-bs-scroll="true"
     data-bs-backdrop="false"
     tabindex="-1"
     aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header pb-0">
        <h5 class="offcanvas-title"></h5>
        <i class="bi bi-chevron-right btn-outline-success px-1" data-bs-dismiss="offcanvas" aria-label="Close" ></i>
    </div>
    <div class="offcanvas-body" style="padding-top:0.5rem;"></div>
</div>`;

        div.innerHTML = html;

        document.body.append(div);
    }

    function bindPointersAndEvents() {

        const offCanvasDom = document.getElementById('mapLayerListOffCanvas');

        //keep panel pointer
        panel = new Offcanvas(offCanvasDom);

        //keep panelBody pointer
        panelBody = offCanvasDom.querySelector('.offcanvas-body');

    }

    function show() {
        panel.show();
    }

    function hide() {
        panel.hide();
    }

//===== Data list ==

    function renderList(baseLayers, overLayers) {

        const html = [
            renderBaseLayers(baseLayers),
            renderOverLayerGroup(overLayers)
        ];

        panelBody.innerHTML = html.join('');

        const btn = panelBody.querySelector('.add-WMTS-layer-btn');

        btn.onclick = async () => {

            const { default: WMTSInputModal } = await import('./wmts-input-modal');

            WMTSInputModal.open(addWMTSLayerByUserInput);

        }

    }

    function bindDataNodeEvent() {

        const containers = panelBody.querySelectorAll('.collapseWrap');

        for (const container of containers) {

            const containerBody = container.querySelector('.collapse');

            initCollapseEffect(container, containerBody);

            bindRadioBtnEvent(containerBody);

            bindCheckBoxEvent(containerBody);

            bindLabelBtnsEvent(containerBody);

            if (container.getAttribute('data-is-your-layer') === 'true') {
                gYourLayerBody = containerBody;
            }

        }

    }

    function renderBaseLayers(baseLayers) {

        const default_layer_id = gDefaultLayer?._leaflet_id;

        const html = [];

        for (const node of baseLayers) {

            html.push(
            `<div class="list-group-item text-truncate py-0 border-0">
<input class="form-check-input me-1" 
       type="radio" 
       name="BaseLayerRadio" 
       checked="${node._leaflet_id === default_layer_id}"
       value="${gBaseLayers.length}"
>
<span>${node.name}</span>
 </div>`);

            gBaseLayers.push(node.layer)
        }

        return renderCollapseRegion('Basemap', html.join(''));

    }

    function renderOverLayerGroup(overLayers) {

        const html = [];

        const labelBtn = '<button class="btn btn-primary btn-sm add-WMTS-layer-btn py-0 px-1" style="height:14pt;line-height: 3pt;">+</button>'

        html.push(renderCollapseRegion(`Your Layers ${labelBtn}`, '', true));

        for (const parentNode of overLayers) {

            const listHtml = renderOverLayerList(parentNode.layers);

            html.push(renderCollapseRegion(parentNode.label, listHtml));

        }

        return html.join('');

    }

    function renderOverLayerList(layers) {

        const listHtml = [];

        for (const layer of layers) {

            rawOverLayers.push(layer);

            const {layerId} = layer.options;

            listHtml.push(
            `<div class="list-group-item text-truncate py-0 border-0">
<input class="form-check-input me-1"
       type="checkbox"
       name="OverLayerCheck"
       value="${layerId}"
>
${getLayerLabelBtns(layer.options)}
 </div>`);

        }

        return listHtml.join('');

    }

    function renderCollapseRegion(title, bodyHtml, isYourLayer) {

        const html = [];

        html.push(`<div class="collapseWrap mb-2" data-is-your-layer="${isYourLayer === true}">`);

        html.push(
        `<div class="mb-1"><i class="bi bi-dash-square me-1 collapse-btn" style="cursor: pointer;"></i>${title}</div>`);

        html.push('<div class="collapse">');

        html.push(bodyHtml)

        html.push('</div>');

        html.push('</div>');

        return html.join('');

    }

    function initCollapseEffect(container, containerBody) {

        const collapseObj = new Collapse(containerBody, {toggle: true});

        const collapseBtn = container.querySelector('.collapse-btn');

        collapseBtn.onclick = (e) => {
            collapseBtn.classList.toggle('bi-plus-square');
            collapseBtn.classList.toggle('bi-dash-square');
            collapseObj.toggle();
        }

    }

    function bindRadioBtnEvent(rootElement) {

        const radioBtns = rootElement.querySelectorAll('[name=BaseLayerRadio]');

        for (const radio of radioBtns) {

            radio.onchange = (e) => {

                localMap.removeLayer(gDefaultLayer);

                const activeLayer = gBaseLayers[e.target.value];

                activeLayer.addTo(localMap);

                gDefaultLayer = activeLayer
            }
        }
    }

    function bindCheckBoxEvent(rootElement) {

        const checkBoxes = rootElement.querySelectorAll('[name=OverLayerCheck]');

        for (const checkBox of checkBoxes) {

            checkBox.onchange = (e) => {

                const layerId = parseInt(e.target.value, 10);

                const activeLayer = getYourLayer(layerId) || getLayer(layerId);

                if (activeLayer) {
                    if (e.target.checked) {
                        activeLayer.addTo(localMap);
                    } else {
                        localMap.removeLayer(activeLayer);
                    }
                }

            }
        }

    }

    function getLayerLabelBtns({label, layerId, center, removable, ifffBtnParams}) {

        //TODO: button's icons are highly coupling to a UI library

        const defaultBtnCls = 'bi';

        const result = [];

        result.push(`<i class="${defaultBtnCls} bi-clipboard-plus copyTileURL" title="Copy Tileset URL"></i>`);

        if (center) {
            result.push(
            `<i class="${defaultBtnCls} bi-pin-map flyTo" title="Move map to this location."
                data-center-lat="${center.lat}" data-center-lng="${center.lng}"></i>`
            );
        }

        if (ifffBtnParams) {
            result.push(
            `<i class="${defaultBtnCls} bi-window-stack toIIIFViewer" title="Show in the IIIF viewer"
                data-manifest-id="${ifffBtnParams.manifestId}" data-canvas-id="${ifffBtnParams.canvasId}" ></i>`
            );
        }

        if (removable) {
            result.push(`<i class="${defaultBtnCls} bi-x-square removeLayer" title="Remove this layer"></i>`);
        }

        return `${label}<span class="label-btns ms-1" data-layer-id="${layerId}" style="cursor: pointer;">${result.join(' ')}</span>`;
    }

//===== Bind event handler to the buttons of a layer label ==

    function bindLabelBtnsEvent(rootElement) {

        const list = rootElement.querySelectorAll('.label-btns');

        for (const btns of list) {

            const layerId = parseInt(btns.getAttribute('data-layer-id'), 10);

            addBtnClickListener(btns, '.copyTileURL', (e) => {
                e.preventDefault();
                copyTileURL(layerId);
            });

            addBtnClickListener(btns, '.removeLayer', (e) => {
                e.preventDefault();
                removeYourLayer(layerId);
            });

            let btn = btns.querySelector('.flyTo');
            if (btn) {
                const lat = parseFloat(btn.getAttribute('data-center-lat'));
                const lng = parseFloat(btn.getAttribute('data-center-lng'));
                btn.onclick = (e) => {
                    e.preventDefault();
                    flyTo(lat, lng, e.target);
                }
            }

            btn = btns.querySelector('.toIIIFViewer');
            if (btn) {
                const manifestId = btn.getAttribute('data-manifest-id');
                const canvasId = btn.getAttribute('data-canvas-id');

                btn.onclick = (e) => {
                    e.preventDefault();
                    localEventEmitter.emit('showIIIFViewer', {manifestId, canvasId});
                }
            }

        }

    }

    function addBtnClickListener(btns, selector, handler) {
        let btn = btns.querySelector(selector);
        if (btn) {
            btn.onclick = handler;
        }
    }

    function copyTileURL(layerId) {

        let activeLayer = getYourLayer(layerId);

        if (!activeLayer) {
            activeLayer = getLayer(layerId);
        }

        if (activeLayer) {

            const url = activeLayer._url

            navigator.clipboard.writeText(url).then(
            () => localEventEmitter.emit('tilesUrlCopied', url)
            );

        }

    }

    function flyTo(lat, lng, target) {

        if (!localMap) return;

        localMap.flyTo([lat, lng], 7);

        const container = target.parentElement.parentElement
        const checkBox = container.querySelector('[name=OverLayerCheck]')

        checkBox.checked = true;
        checkBox.onchange({target: {checked: true, value: checkBox.value}});

    }

//===== get one over-layer ==

    function getLayer(layerId) {

        let activeLayer = null;

        for (const layer of rawOverLayers) {

            if (layer.options.layerId === layerId) {
                activeLayer = layer;
                break;
            }
        }

        return activeLayer;

    }

//===== Your layer region ==

    async function addWMTSLayerByUserInput(nameText, urlText){

        const name = nameText.trim();
        const url = urlText.trim();

        if(name === '' || url === '') {
            //TODO: i18n
            localEventEmitter.emit('exception', 'Name and Url are both required');
            return;
        }

        addWMTSLayer({name, sURL: url, attribution: '', url});

        const { default: WMTSInputModal } = await import('./wmts-input-modal');

        WMTSInputModal.close();

    }

    function addIntoYourLayer(layers) {

        for (const layer of layers) {

            const {
                year, na: name, sname: attribution, geojson: geoJson,
                url, surl: sURL, murl: mURL, iurl: iURL, ty, longTitle, zoomMin, zoomMax
            } = layer;

            if (ty === "iiif") {

                addImgOverLayer({
                    geoJson, name, year, attribution, url, sURL, mURL, iURL, longTitle,
                    zoomMin, zoomMax
                });

            } else if (ty === "tiles") {

                addWMTSLayer({
                    name, year, attribution, url, sURL, longTitle, zoomMin, zoomMax
                });

            }

        }

    }

    const gLabelCharLenLimit = 15;

    const gYearLabelCharLen = 7;

    const gBCYearLabelCharLen = 11;

    function addImgOverLayer({geoJson, name, sURL, mURL, iURL, longTitle, zoomMin, zoomMax}) {

        //TODO: need to test
        const imgURL = `${sURL}/full/${GEO_REF_IMG_SIZE * 4},/0/default.jpg`;

        const gj = JSON.parse(geoJson);
        const ca = gj.coordinates[0];

        const layerId = SnowflakeID.next();

        // Add into user's layer
        const shortName = (name.length > gLabelCharLenLimit) ? name.substr(0, gLabelCharLenLimit) + "..." : name;

        const label = `<span title="${longTitle || name}">${shortName}</sapn>`;

        const ifffBtnParams = {
            manifestId: mURL,
            canvasId: iURL
        }

        const layer = DistortableImageLayer.build({
            layerId,
            label,
            ifffBtnParams,
            removable: true,
            editable: false,
            longTitle,
            zoomMin,
            zoomMax,
            imgURL,
            baseUrl: sURL,
            mode: "lock",
            corners: [
                {lat: ca[0][1], lng: ca[0][0]},
                {lat: ca[1][1], lng: ca[1][0]},
                {lat: ca[3][1], lng: ca[3][0]},
                {lat: ca[2][1], lng: ca[2][0]},
            ],
            extraActions: {},

        });

        updateYourLayerRegion(layer);
    }

    function addWMTSLayer({name, year, sURL, attribution, url, longTitle, zoomMin, zoomMax}) {

        const yearLabelCharLen = (year < 0) ? gBCYearLabelCharLen : gYearLabelCharLen;

        const charLenLimit = (year) ? gLabelCharLenLimit - yearLabelCharLen : gLabelCharLenLimit;

        const shortName = (name.length > charLenLimit) ? name.substr(0, charLenLimit) + "..." : name;

        const yearLabel = (year) ? ((year) > 0 ? ` - ${year}` : ` - ${year * -1} b.c`) : '';

        const label = `<span title="${longTitle || name}">${shortName}${yearLabel}</sapn>`

        const layerId = SnowflakeID.next();

        const layer = L.tileLayer(sURL, {
            layerId,
            label,
            removable: true,
            longTitle,
            zoomMin,
            zoomMax,
            attribution: `Map data & copy; <a href="${url}">${attribution}</a> contributors`,
        });

        updateYourLayerRegion(layer);

    }

    function updateYourLayerRegion(newLayer) {

        if (newLayer) {
            usersLayers.push(newLayer);
        }

        gYourLayerBody.innerHTML = renderOverLayerList(usersLayers, true);

        bindCheckBoxEvent(gYourLayerBody);

        bindLabelBtnsEvent(gYourLayerBody);

    }

    function getYourLayer(layerId) {

        let activeLayer = null;

        for (const layer of usersLayers) {

            if (layer.options.layerId === layerId) {
                activeLayer = layer;
                break;
            }
        }

        return activeLayer;

    }

    function removeYourLayer(layerId) {

        for (const idx in usersLayers) {

            const layer = usersLayers[idx];

            if (layer.options.layerId === layerId) {

                localMap.removeLayer(layer);

                usersLayers.splice(idx, 1);

                break;
            }
        }

        updateYourLayerRegion();

    }

    return {
        init,
        show,
        hide,
        addIntoYourLayer,
        on: addEventListener,
    };

    /* Events

        { name: 'showIIIFViewer', params: { manifestId, canvasId }}
        { name: 'tilesUrlCopied', params: url-String)
        { name: 'exception', params: msg-String }

     */
}();

export default MapLayersPanel;
