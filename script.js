const getTable = document.getElementById('mainTable');
const tableBody = document.getElementById('tableBody');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let page = '1';
let size = '10';

function clearTable() {
    tableBody.innerHTML = ``;
}

function createDataTable(data) {
    data.forEach((elm) => {
        tableBody.innerHTML +=
            '<tr><td>' +
            elm.id +
            '</td><td>' +
            elm.name +
            '</td><td>' +
            elm.email +
            '</td><td>' +
            elm.phone_number +
            '</td><td>' +
            elm.address +
            '</td></tr>';
    });
}

async function getData() {
    try {
        const response = await fetch(`http://13.232.225.92:8001/api/total-person/?page=${page}&size=${size}`);
        const json = await response.json();

        if (json.data.previous === null) {
            prev.style.display = 'none';
        } else {
            prev.style.display = 'inline';
            prev.setAttribute('data-link', json.data.previous);
        }

        if (json.data.next === null) {
            next.style.display = 'none';
        } else {
            next.style.display = 'inline';
            next.setAttribute('data-link', json.data.next);
        }

        createDataTable(json.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error! while fetching data.');
    }
}

getData();

function pageChange(val) {
    page = val.toString();
    clearTable();
    getData();
}

function sizeChange(val) {
    size = val.toString();
    clearTable();
    getData();
}

async function nextPrev(link) {
    let newLink = link.getAttribute('data-link');

    clearTable();

    try {
        const response = await fetch(newLink);
        const json = await response.json();

        if (json.data.previous === null) {
            prev.style.display = 'none';
        } else {
            prev.style.display = 'inline';
            prev.setAttribute('data-link', json.data.previous);
        }

        if (json.data.next === null) {
            next.style.display = 'none';
        } else {
            next.style.display = 'inline';
            next.setAttribute('data-link', json.data.next);
        }

        createDataTable(json.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error! while fetching data.');
    }
}
