
import { BootstrapWrap } from "@chmap/utilities";

const { Modal } = BootstrapWrap;

const WMTSInputModal = function() {

    let modalDom = null;

    let modal = null;

    let gCallback = null

    function creat() {

        const html =
`<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add your WMTS layer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label" for="WMTSNameInput">*Layer name</label>
          <input type="text" id="WMTSNameInput" class="form-control" placeholder="Liao Ning">
        </div>
        <div class="mb-3">
            <label class="form-label" for="WMTSUrlInput">*WMTS Url</label>
            <input type="text" id="WMTSUrlInput" class="form-control" placeholder="https://chmap.mpiwg-berlin.mpg.de/liaoning/{z}/{x}/{y}.png">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary add-btn">Add</button>
      </div>
    </div>
 </div>`;

        const div = document.createElement('div');

        div.className = 'modal fade';
        div.innerHTML = html;

        document.body.append(div);

        modalDom = div;

        modalDom.querySelector('.add-btn').onclick = onAdd;

        modal = Modal.getOrCreateInstance(div);

    }

    function onAdd(e) {

        const name = modalDom.querySelector('#WMTSNameInput').value;

        const url = modalDom.querySelector('#WMTSUrlInput').value;

        gCallback(name, url);

    }

    function open(callback) {

        if (!modal) {
            creat();
        }

        gCallback = callback;

        modal.show();

    }

    function close() {

        if (modal) {
            modal.hide();
        }

    }

    return {
        open,
        close,
    }

}();

export default WMTSInputModal;
