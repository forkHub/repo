ha.Folder.init();
ha.Folder.buatFolder('base/base1/base2');
console.log(ha.Folder.root);
console.log('buat file:');
ha.Folder.buatFile('base/base1/base2', 'nama-file', 'isi file');
console.log('read file:');
console.log(ha.Folder.bacaFile('base/base1/base2/nama-file'));
