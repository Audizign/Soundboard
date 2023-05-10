document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('grid');
    const contextMenu = document.getElementById('context-menu');
    var spam = false;

    fetch(`http://localhost:3000/api?category=${category}`)
        .then(res => res.json())
        .then(sounds => {
            sounds[category].forEach(s => {
                const button = document.createElement('button');
                button.classList.add('sound-button');
                button.appendChild(document.createTextNode(s.name));
                
                const audio = new Audio(`${s.path}\\${s.file}`);
                button.addEventListener('click', function (e) {
                    if (spam) {
                        new Audio(`${s.path}\\${s.file}`).play();
                        return;
                    }
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                });

                button.addEventListener('contextmenu', function (e) {
                    e.preventDefault();

                    const menuSave = document.getElementById('menu-save');
                    menuSave.removeChild(menuSave.firstChild);
                    menuSave.appendChild(document.createTextNode('Save: ' + s.file.toUpperCase()));
                    menuSave.addEventListener('click', function menuSave(e) {
                        const a = document.createElement('a');
                        a.href = `..\\${s.path}\\${s.file}`;
                        a.download = s.file;
                        a.click();
                        contextMenu.style.removeProperty('display');
                        e.stopPropagation();
                        this.removeEventListener('click', menuSave);
                    });

                    const menuCopy = document.getElementById('menu-copy');
                    menuCopy.addEventListener('click', function menuCopy(e) {
                        navigator.clipboard.writeText(`${window.location.protocol}\\\\${window.location.host}\\${s.path}\\${s.file}`);
                        contextMenu.style.removeProperty('display');
                        e.stopPropagation();
                        this.removeEventListener('click', menuCopy);
                    });

                    const menuOpen = document.getElementById('menu-open');
                    menuOpen.addEventListener('click', function menuOpen(e) {
                        window.open(`${window.location.protocol}\\\\${window.location.host}\\${s.path}\\${s.file}`);
                        contextMenu.style.removeProperty('display');
                        e.stopPropagation();
                        this.removeEventListener('click', menuOpen);
                    });

                    contextMenu.style.display = 'block';
                    const right = e.clientX + contextMenu.offsetWidth > document.body.clientWidth;
                    const bottom = e.clientY + contextMenu.offsetHeight > document.body.clientHeight;
                    contextMenu.style.left = right ? document.body.clientWidth - contextMenu.offsetWidth - 10 + 'px' : `${e.clientX}px`;
                    contextMenu.style.top = bottom ? document.body.clientHeight - contextMenu.offsetHeight - 10 + 'px' : `${e.clientY}px`;
                });
                
                grid.appendChild(button);

                document.addEventListener('mousedown', (e) => {
                    if (!Array.from(contextMenu.children).map(c => c).includes(e.target)) {
                        contextMenu.style.removeProperty('display');
                    }
                });
            });
        });
})