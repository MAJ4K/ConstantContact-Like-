const navbtns = document.getElementsByTagName('nav')[0]
	.getElementsByTagName('a');
const tempTabs = findAllTheKids(
	document.getElementsByClassName('temp-tabs'),
	'h3'
);

function findAllTheKids(eArr,type) {
	var value = [];
	for (const element of eArr) {
		for (const subelement of element.getElementsByTagName(type)) {
			value.push(subelement);
		}
	}
	return value;
}

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

function tog(id) {
	const element = document.getElementById(id);
	if (element.classList.contains('active'))
		element.classList.remove('active');
	else element.classList.add('active');
}

for (const btn of navbtns) {
	btn.addEventListener('click', () => {
		changeActive(btn.classList[0]);
	});
}
for (const btn of tempTabs) {
	btn.addEventListener('click', () => {
		changeActive(btn.classList[0]);
	});
}