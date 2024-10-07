function addEmptyInput() {
    const newNameInput = document.createElement("input");
    newNameInput.setAttribute("type", "text");
    newNameInput.setAttribute("class", "form-control");
    newNameInput.setAttribute("name", "name-input");
    newNameInput.setAttribute("placeholder", "명칭");
    newNameInput.setAttribute("aria-label", "명칭");

    const newAddressInput = document.createElement("input");
    newAddressInput.setAttribute("type", "text");
    newAddressInput.setAttribute("class", "form-control w-auto");
    newAddressInput.setAttribute("name", "address-input");
    newAddressInput.setAttribute("placeholder", "도로명 주소");
    newAddressInput.setAttribute("aria-label", "도로명 주소");

    const newPinButton = document.createElement("button");
    newPinButton.setAttribute("class", "btn btn-outline-secondary");
    newPinButton.setAttribute("name", "pin-button");
    newPinButton.innerHTML = "<i class=\'bi bi-pin-angle-fill\'></i>";

    const newLocationButton = document.createElement("button");
    newLocationButton.setAttribute("class", "btn btn-outline-secondary");
    newLocationButton.setAttribute("name", "location-button");
    newLocationButton.innerHTML = "<i class=\'bi bi-geo-alt-fill\'></i>";

    const newRemoveButton = document.createElement("button");
    newRemoveButton.setAttribute("class", "btn btn-outline-secondary");
    newRemoveButton.setAttribute("name", "remove-button");
    newRemoveButton.onclick = () => removeInput(newRemoveButton);
    newRemoveButton.innerHTML = "<i class=\'bi bi-trash3-fill\'></i>";

    const newInputGroup = document.createElement("div");
    newInputGroup.setAttribute("class", "input-group");
    newInputGroup.appendChild(newNameInput);
    newInputGroup.appendChild(newAddressInput);
    newInputGroup.appendChild(newPinButton);
    newInputGroup.appendChild(newLocationButton);
    newInputGroup.appendChild(newRemoveButton);

    document.getElementById("address").appendChild(newInputGroup);
}

function addInput(name, address) {
    const newNameInput = document.createElement("input");
    newNameInput.setAttribute("type", "text");
    newNameInput.setAttribute("class", "form-control");
    newNameInput.setAttribute("name", "name-input");
    newNameInput.setAttribute("value", name);
    newNameInput.setAttribute("placeholder", "명칭");
    newNameInput.setAttribute("aria-label", "명칭");

    const newAddressInput = document.createElement("input");
    newAddressInput.setAttribute("type", "text");
    newAddressInput.setAttribute("class", "form-control w-auto");
    newAddressInput.setAttribute("name", "address-input");
    newAddressInput.setAttribute("value", address);
    newAddressInput.setAttribute("placeholder", "도로명 주소");
    newAddressInput.setAttribute("aria-label", "도로명 주소");

    const newPinButton = document.createElement("button");
    newPinButton.setAttribute("class", "btn btn-outline-secondary");
    newPinButton.setAttribute("name", "pin-button");
    newPinButton.innerHTML = "<i class=\'bi bi-pin-angle-fill\'></i>";

    const newLocationButton = document.createElement("button");
    newLocationButton.setAttribute("class", "btn btn-outline-secondary");
    newLocationButton.setAttribute("name", "location-button");
    newLocationButton.innerHTML = "<i class=\'bi bi-geo-alt-fill\'></i>";

    const newRemoveButton = document.createElement("button");
    newRemoveButton.setAttribute("class", "btn btn-outline-secondary");
    newRemoveButton.setAttribute("name", "remove-button");
    newRemoveButton.onclick = () => removeInput(newRemoveButton);
    newRemoveButton.innerHTML = "<i class=\'bi bi-trash3-fill\'></i>";

    const newInputGroup = document.createElement("div");
    newInputGroup.setAttribute("class", "input-group");
    newInputGroup.appendChild(newNameInput);
    newInputGroup.appendChild(newAddressInput);
    newInputGroup.appendChild(newPinButton);
    newInputGroup.appendChild(newLocationButton);
    newInputGroup.appendChild(newRemoveButton);

    document.getElementById("address").appendChild(newInputGroup);
}

function removeInput(removeBtn) {
    const inputGroup = removeBtn.parentNode;
    return inputGroup.remove();
}

function toggleInputs(nameInput, addressInput) {
    if (nameInput.getAttribute("class") === "form-control") {
        nameInput.setAttribute("class", "form-control border border-success");
        addressInput.setAttribute("class", "form-control w-auto border border-success");
    } else {
        nameInput.setAttribute("class", "form-control");
        addressInput.setAttribute("class", "form-control w-auto");
    }
}

function reset() {
    document.getElementById("address").innerHTML = '';
    addEmptyInput();
    clearMarkers();
}

function handleFile(e) {
    if (e.files && e.files.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.files[0], 'EUC-KR');
        fileReader.onloadend = e => {
            e?.target?.result &&
            setColumnOptions(e.target.result.toString()
                .split('\r\n')
                .filter(row => row.length > 0)
                .map(row => row.split(',')));
            $('#show-modal-btn').click();
        }
    } else {
        alert("불러오기 실패");
    }
}

function setColumnOptions(matrix) {
    $('#modal-body').html(`
            <div class="input-group">
                <select class="form-select" id="name-col">
                  <option selected disabled hidden>명칭</option>
                  ${matrix[0].map((text, index) => '<option value=' + index + '>' + text + '</option>')};
                </select>
                <select class="form-select" id="address-col">
                  <option selected disabled hidden>도로명 주소</option>
                  ${matrix[0].map((text, index) => '<option value=' + index + '>' + text + '</option>')};
                </select>
            </div>
        `);
    $('#fetch-data-btn')[0].onclick = (() => fetchData(matrix));
}

function fetchData(matrix) {
    const nameColNum = $('#name-col')[0].selectedIndex - 1;
    const addressColNum = $('#address-col')[0].selectedIndex - 1;
    if (nameColNum < 0 || addressColNum < 0) {
        return alert("열을 선택해주세요.");
    }

    matrix.forEach(row => addInput(row[nameColNum], row[addressColNum]));
    $('#modal-close-btn').click();
}