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
-- Struktur dari tabel `tk_anggota`
--

CREATE TABLE `tk_anggota` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `lapak` varchar(50) NOT NULL DEFAULT 'belum ada nama',
  `deskripsi` varchar(500) NOT NULL,
  `wa` varchar(20) NOT NULL,
  `setuju` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tk_anggota`
--

INSERT INTO `tk_anggota` (`id`, `user_name`, `password`, `alamat`, `email`, `lapak`, `deskripsi`, `wa`, `setuju`) VALUES
(1, 'test', '098f6bcd4621d373cade4e832627b4f6', 'editdafdasdfddd', 'rokhman.fajar@gmail.com2', 'Lapak12', 'Lapak deskripsi2', '012345678929', 1),
(2, 'test2', 'ad0234829205b9033196ba818f7a872b', '', 'rokhman.fajar2@gmail.com', 'Lapak2', 'Lapak 2 deskripsi', '01234567892', 1),
(3, 'test3', '8ad8757baa8564dc136c1e07507f4a98', '', 'rokhman.fajar3@gmail.com', 'Lapak 3', 'Lapak deskripsi', '01234567893', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tk_anggota`
--
ALTER TABLE `tk_anggota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_idx` (`email`),
  ADD UNIQUE KEY `wa_idx` (`wa`),
  ADD UNIQUE KEY `user_name_idx` (`user_name`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tk_anggota`
--
ALTER TABLE `tk_anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
