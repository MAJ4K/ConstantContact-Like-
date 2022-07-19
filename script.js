if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("sw.js")
	.then( registration => {
		console.log("SW registered");
		console.log(registration);
	})
	.catch(err => {
		console.error("SW Registration Failed");
		console.error(err);
	})
} else { console.warn("PWA Not Supported");}

const listopenbtn = document.getElementById("ListOpen");
const listclosebtn = document.getElementById("ListClose");
const listModal = document.getElementById("ListModal");
const mailing_lists = document.getElementsByClassName("list");
const table_modal = document.getElementById("TableModal");
const tableclosebtn = document.getElementById("TableClose");
const mainDisplays = document.getElementsByTagName("main");
const listTemplate = document.getElementById("list-template");
const listContent = document.getElementById("list-content");
const ViewTable = document.getElementById("ViewTable");
const csvloadbtn = document.getElementById("CSVload");

// let fh;
// csvloadbtn.addEventListener('click', () => {getfile();
// });
// async function getfile() {
// 	[fh] = await window.fi;
// }

function addList(id) {
	var list = document.createElement('div');
	var para = document.createElement('p');

	para.innerText = id;

	list.addEventListener('click', () => {
		showListTable(localStorage.getItem(id));
	});
	list.appendChild(para);
	list.classList.add('list');
	listContent.appendChild(list);
}

function mainDisplay(index) {
	for (const disp of mainDisplays) {
		disp.classList.remove('active');
	}
	mainDisplays[index].classList.add('active');
}
listopenbtn.addEventListener('click', () => {
	listModal.classList.add('show');
});
listclosebtn.addEventListener('click', () => {
	listModal.classList.remove('show');
});
function showListTable(data) {
	var i = 0, maxcols = 0;
	for (const row of data.split('\n')) {
		var j = 0;
		for (const cell of row.split('\t')) {
			var para;
			if (cell == "NAME") para = document.createElement('h3');
			else if (cell == "EMAIL") para = document.createElement('h3');
			else para = document.createElement('p');
			para.innerText = cell;
			para.style.gridRow = i + 1;
			para.style.gridColumn = ++j;

			if(j>maxcols) maxcols = j;
			ViewTable.appendChild(para);
		}
		i++;
	}
	table_modal.style.setProperty("--gridcolumns",maxcols);
	table_modal.classList.add('show');
}
tableclosebtn.addEventListener('click', () => {
	table_modal.classList.remove('show');
	ViewTable.innerText = '';
});
