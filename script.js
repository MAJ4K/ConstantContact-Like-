const navbtns = document.getElementsByTagName('nav')[0]
	.getElementsByTagName('a');
const favSavs = document.getElementById('fav-sav')
	.getElementsByTagName('h3');


function changeActive(id) {
	const temps = document.getElementsByClassName(id);
	for (const temp of temps) {
		const siblings =  temp.parentNode.children;
		for (const sib of siblings) {
			sib.classList.remove('active');
		}
		temp.classList.add('active');
	}
}

for (const btn of navbtns) {
	btn.addEventListener('click', () => {
		changeActive(btn.classList[0]);
	});
}
for (const btn of favSavs) {
	btn.addEventListener('click', () => {
		changeActive(btn.classList[0]);
	});
}