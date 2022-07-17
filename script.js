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

listopenbtn.addEventListener('click', () => {
	listModal.classList.add('show');
});
listclosebtn.addEventListener('click', () => {
	listModal.classList.remove('show');
});