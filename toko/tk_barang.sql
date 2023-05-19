-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Sep 2021 pada 05.57
-- Versi server: 10.1.40-MariaDB
-- Versi PHP: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tk_barang`
--

CREATE TABLE `tk_barang` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `deskripsi` varchar(500) DEFAULT NULL,
  `desk_panjang` text,
  `harga` int(11) NOT NULL,
  `anggota_id` int(11) NOT NULL,
  `publish` int(11) NOT NULL,
  `jml_view` int(11) NOT NULL,
  `tgl_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thumb` varchar(255) NOT NULL DEFAULT '/gbr/kosong.png',
  `gbr` varchar(255) NOT NULL DEFAULT '/gbr/kosong.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tk_barang`
--

INSERT INTO `tk_barang` (`id`, `nama`, `deskripsi`, `desk_panjang`, `harga`, `anggota_id`, `publish`, `jml_view`, `tgl_update`, `thumb`, `gbr`) VALUES
(1, 'barang1dfasdfsadfsdd adfas dfa dsafd', 'deskripsidfasfdsadfdd', 'deskripsi panjang', 400012, 1, 2, 0, '2021-08-21 12:51:42', '/gbr/thumb.png', '/gbr/gambar.png'),
(2, 'barang2', 'deskripsi2', 'deskripsi panjang2', 4000, 1, 2, 0, '2021-08-21 12:52:03', '/gbr/thumb.png', '/gbr/gambar.png'),
(3, 'barang3', 'deskripsi', 'deskripsi panjang', 4000, 1, 3, 0, '2021-08-01 04:55:11', '/gbr/thumb.png', '/gbr/gambar.png'),
(4, 'barang4', 'deskripsi', 'deskripsi panjang', 4000, 1, 2, 0, '2021-08-21 12:51:51', '/gbr/thumb.png', '/gbr/gambar.png'),
(5, 'barang5', 'deskripsi', 'deskripsi panjang', 4000, 1, 3, 0, '2021-08-01 04:55:11', '/gbr/thumb.png', '/gbr/gambar.png'),
(6, 'barang6', 'deskripsi', 'deskripsi panjang', 4000, 1, 3, 0, '2021-08-01 04:55:11', '/gbr/thumb.png', '/gbr/gambar.png'),
(7, 'barang7', 'deskripsi', 'deskripsi panjang', 4000, 1, 3, 0, '2021-08-01 04:55:11', '/gbr/thumb.png', '/gbr/gambar.png'),
(8, 'barang8', 'deskripsi', 'deskripsi panjang', 4000, 1, 3, 0, '2021-08-01 04:55:11', '/gbr/thumb.png', '/gbr/gambar.png'),
(9, 'barang9', 'deskripsi', 'deskripsi panjang', 4000, 1, 3, 0, '2021-08-01 04:55:11', '/gbr/thumb.png', '/gbr/gambar.png');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tk_barang`
--
ALTER TABLE `tk_barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barang_anggota` (`anggota_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tk_barang`
--
ALTER TABLE `tk_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tk_barang`
--
ALTER TABLE `tk_barang`
  ADD CONSTRAINT `barang_anggota` FOREIGN KEY (`anggota_id`) REFERENCES `tk_anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
