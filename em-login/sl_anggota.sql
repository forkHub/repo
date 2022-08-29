-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2021 at 02:54 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

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
-- Table structure for table `sl_anggota`
--

CREATE TABLE `sl_anggota` (
  `id` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `nama_lengkap` varchar(50) DEFAULT NULL,
  `alamat` varchar(200) DEFAULT NULL,
  `jkl` varchar(1) NOT NULL DEFAULT 'l',
  `tgl_lahir` timestamp NULL DEFAULT NULL,
  `tgl_meninggal` timestamp NULL DEFAULT NULL,
  `wa` varchar(15) DEFAULT NULL,
  `fb` varchar(255) DEFAULT NULL,
  `instagram` varchar(128) DEFAULT NULL,
  `thumb` varchar(300) NOT NULL DEFAULT '',
  `foto` varchar(300) NOT NULL DEFAULT '',
  `ortu_id` int(11) DEFAULT 0,
  `rel_id` int(11) NOT NULL DEFAULT 0,
  `hapus` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `sl_anggota`
--
ALTER TABLE `sl_anggota`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sl_anggota`
--
ALTER TABLE `sl_anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
