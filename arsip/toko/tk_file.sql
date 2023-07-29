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
-- Struktur dari tabel `tk_file`
--

CREATE TABLE `tk_file` (
  `id` int(11) NOT NULL,
  `gbr` varchar(500) NOT NULL,
  `thumb` varchar(500) NOT NULL,
  `barang_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tk_file`
--

INSERT INTO `tk_file` (`id`, `gbr`, `thumb`, `barang_id`) VALUES
(1, '/gbr/gambar.png', '/gbr/thumb.png', 1),
(2, '/gbr/gambar.png', '/gbr/thumb.png', 2),
(3, '/gbr/gambar.png', '/gbr/thumb.png', 3),
(4, '/gbr/gambar.png', '/gbr/thumb.png', 4),
(5, '/gbr/gambar.png', '/gbr/thumb.png', 5),
(6, '/gbr/gambar.png', '/gbr/thumb.png', 6),
(7, '/gbr/gambar.png', '/gbr/thumb.png', 7),
(8, '/gbr/gambar.png', '/gbr/thumb.png', 8),
(9, '/gbr/gambar.png', '/gbr/thumb.png', 9);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tk_file`
--
ALTER TABLE `tk_file`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `barang_key` (`barang_id`) USING BTREE;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tk_file`
--
ALTER TABLE `tk_file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tk_file`
--
ALTER TABLE `tk_file`
  ADD CONSTRAINT `barang_key` FOREIGN KEY (`barang_id`) REFERENCES `tk_barang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
