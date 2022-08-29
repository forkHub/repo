-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 30, 2022 at 06:10 AM
-- Server version: 10.3.32-MariaDB-log-cll-lve
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sofwanwe_silsilah`
--

-- --------------------------------------------------------

--
-- Table structure for table `sl_admin`
--

CREATE TABLE `sl_admin` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `def_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sl_admin`
--

INSERT INTO `sl_admin` (`id`, `user_name`, `password`, `def_id`) VALUES
(1, 'sofwan', '61e6f451ce501174081d2f295865affe', 37);

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
  `hapus` int(1) NOT NULL DEFAULT 0,
  `bani` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sl_anggota`
--

INSERT INTO `sl_anggota` (`id`, `nama`, `nama_lengkap`, `alamat`, `jkl`, `tgl_lahir`, `tgl_meninggal`, `wa`, `fb`, `instagram`, `thumb`, `foto`, `ortu_id`, `rel_id`, `hapus`, `bani`) VALUES
(1, 'baihaqi', 'Baihaqi sofwan', 'Jl. Sumatra IX No. 148 Jember', 'l', '2021-12-01 17:00:00', '0000-00-00 00:00:00', '6285236024511', '', '', '', '', 15, 12, 0, 1),
(29, 'Satumi', 'Satumi', 'Jember', 'p', '2021-10-31 17:00:00', '0000-00-00 00:00:00', '', '', '', '/upload/thumb_Z95KL30N2021_10_9_8_40_55_286.png', '/upload/gbr_Z95KL30N2021_10_9_8_40_55_286.png', 0, 12, 0, 1),
(30, 'ilul', 'Eko rijalul wathoni', 'Jl. Kedungrukem 14 Belakang Tunjungan Plaza Surabaya', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6285745890599', '', '', '/upload/thumb_EUCTTCX32021_10_9_8_31_3_788.png', '/upload/gbr_EUCTTCX32021_10_9_8_31_3_788.png', 12, 13, 0, 1),
(31, 'dira', 'Dira', 'Surabaya', 'p', '2021-10-07 17:00:00', '0000-00-00 00:00:00', '6285755174115', '', '', '', '', 0, 13, 0, 1),
(32, 'anam', 'Arief Khoriul Anam', 'Jl. Nias III No. 31 Jember', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6281666675625', '', '', '/upload/thumb_NUHAPCNP2021_10_9_8_31_19_296.png', '/upload/gbr_NUHAPCNP2021_10_9_8_31_19_296.png', 12, 14, 0, 1),
(33, 'elok', 'Elok Zakiyah', 'Jember', 'p', '2021-10-07 17:00:00', '0000-00-00 00:00:00', '62336667625', '', '', '', '', 0, 14, 0, 1),
(34, 'naufal', 'Rifqi Naufal Iman', 'Jember', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 14, 0, 0, 1),
(35, 'roihan', 'Roihan Nur Ikhsan', 'Jember', 'l', '2021-10-08 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 14, 0, 0, 1),
(36, 'noni', 'Noni', 'Surabaya', 'p', '2021-11-07 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 18, 15, 0, 1),
(37, 'sofwan', 'Sofwan', 'Surabaya', 'l', '2021-11-07 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 15, 0, 1),
(38, 'fajar', 'fajar nur rokhman', 'Perum Taman Melati Blok FE 07\nDuren Mekar - Bojongsari - Depok', 'l', '1981-09-08 17:00:00', '0000-00-00 00:00:00', '6281285382224', 'https://m.facebook.com/fajar.n.rokhman', '', '/upload/thumb_795M98MD2021_10_9_18_37_23_995.png', '/upload/gbr_795M98MD2021_10_9_18_37_23_995.png', 12, 16, 0, 1),
(39, 'mala', 'Nuril Mala Tsani', 'Perum Taman Melati Blok FE 07 Duren Mekar - Bojongsari - Depok', 'p', '1983-04-18 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 16, 0, 1),
(40, 'indah', 'indah', 'jember', 'p', '1981-01-02 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 12, 17, 0, 1),
(41, 'budi', 'budi', 'jember', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '/upload/thumb_HBD4BBUH2021_10_9_8_38_56_832.png', '/upload/gbr_HBD4BBUH2021_10_9_8_38_56_832.png', 0, 17, 0, 1),
(42, 'Rafiqoh Nur Izzati', 'izzah', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6285546645645', '', '', '', '', 13, 0, 0, 1),
(43, 'rifa', 'Syarifah indah zainiyah', 'surabaya', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '628819051108', '', '', '', '', 13, 0, 0, 1),
(44, 'auni', 'auni', 'Perum Taman Melati Blok FE 07 Duren Mekar - Bojongsari - Depok', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '/upload/thumb_AHW2VFZV2021_10_9_18_48_38_53.png', '/upload/gbr_AHW2VFZV2021_10_9_18_48_38_53.png', 16, 0, 0, 1),
(45, 'hanan', 'hanan hulwah kayyisah', 'Perum Taman Melati Blok FE 07 Duren Mekar - Bojongsari - Depok', 'p', '2017-10-02 17:00:00', '0000-00-00 00:00:00', '', '', '', '/upload/thumb_5L35A63R2021_10_9_18_49_40_566.png', '/upload/gbr_5L35A63R2021_10_9_18_49_40_566.png', 16, 0, 0, 1),
(46, 'Buyut 1', 'Buyut1', 'Alamat', 'l', '2021-11-12 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 18, 0, 1),
(47, 'Buyut 2', 'Buyut 2', 'Alamat', 'p', '2021-11-12 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 18, 0, 1),
(48, 'baidhowi', 'Baidhowi Sofwan', 'Jl. Diponegoro Gang V No 30 Kauman Ambulu', 'l', '2021-11-30 17:00:00', '0000-00-00 00:00:00', '6285336178172', '', '', '', '', 15, 19, 0, 1),
(49, 'Rumini', 'Rumini', 'Ambulu', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 19, 0, 1),
(50, 'anna', 'Anna mariatul aziza', 'Perum bumi ambulu permai blok DD 9 Ambulu', 'p', '2021-10-31 17:00:00', '0000-00-00 00:00:00', '6285236315366', '', '', '', '', 19, 20, 0, 1),
(51, 'hadi', 'Hadi kuncoro', 'Ambulu', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6285236315366', '', '', '', '', 0, 20, 0, 1),
(52, 'Safira', 'Safira hadiana choirunnisa', 'Ambulu', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6281232276803', '', '', '', '', 20, 0, 0, 1),
(53, 'hanna', 'Hanna shafa salsabila', 'Ambulu', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '62817012292', '', '', '', '', 20, 0, 0, 1),
(54, 'Uus', 'Nurus subhi', 'Ambulu', 'l', '2021-12-01 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 19, 0, 0, 1),
(55, 'haitami', 'Haitami sofwan', 'Jember', 'l', '2021-12-02 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 15, 24, 0, 1),
(56, 'fuad', 'Moh. Fuad sofwan', 'Jl. Argopuro 170 Klompangan Ajung Jember', 'l', '2021-12-03 17:00:00', '0000-00-00 00:00:00', '6285236402154', '', '', '', '', 15, 32, 0, 1),
(57, 'dzikron', 'Moh. Dzikron sofwan', 'Jl. Condrodimuka No. 49 Ambulu Jember', 'l', '2021-12-04 17:00:00', '0000-00-00 00:00:00', '6285236379113', '', '', '', '', 15, 27, 0, 1),
(58, 'Tuffah', 'Tuffah nur affa', 'Ambulu', 'p', '2021-12-05 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 15, 0, 0, 1),
(59, 'nunung', 'Nur Ainul Laili Rohmah', 'Tegalsari Ambulu', 'p', '2021-12-02 17:00:00', '0000-00-00 00:00:00', '628536793404', '', '', '', '', 19, 21, 0, 1),
(60, 'wawan', 'Subhan Arifin', 'RT 03  RW 03 Dusun Ngledok Desa Tulung Kec. Kawedanan Kab Magetan', 'l', '2021-12-03 17:00:00', '0000-00-00 00:00:00', '6283853317468', '', '', '', '', 19, 22, 0, 1),
(61, 'fitri', 'Yulia Fitri Imroah', 'Perum bumi ambulu permai blok D 11 Ambulu Jember', 'p', '2021-11-04 17:00:00', '0000-00-00 00:00:00', '6285232231221', '', '', '', '', 19, 23, 0, 1),
(63, 'Tri', 'Tri Wardana', 'Tegalsari, Ambulu', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '628536793404', '', '', '', '', 0, 21, 0, 1),
(64, 'caesar', 'Caesar Zidan Al Kautsar', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '681235895140', '', '', '', '', 21, 0, 0, 1),
(65, 'yuyun', 'Yuningtiyas Utami Subekti', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6283845303724', '', '', '', '', 0, 22, 0, 1),
(66, 'dzaki', 'Moh Dzaki Arya Pradana', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 22, 0, 0, 1),
(67, 'dzabran', 'Moh. Dzabran Natta Widharma', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 22, 0, 0, 1),
(68, 'lukman', 'Lukman Hakim', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '628336284335', '', '', '', '', 0, 23, 0, 1),
(69, 'royyan', 'Moh. Royyan Al Hakim', '', 'l', '2021-11-30 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 23, 0, 0, 1),
(70, 'altaf', 'Moh. Altaf Al Hakim', '', 'l', '2021-12-01 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 23, 0, 0, 1),
(71, 'najwa', 'Najwa Lutif Hakeema', '', 'p', '2021-12-02 17:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 23, 0, 0, 1),
(72, 'Sri', 'Sri Mulyati', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 24, 0, 1),
(73, 'Prima', 'Prima Hidayati Nurrur Rakhmah', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 24, 25, 0, 1),
(74, 'Washil', 'Muh. Washil', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 25, 0, 1),
(75, 'nurul', 'Dwi Hadiyati Nurul Hikmah', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 24, 26, 0, 1),
(76, 'Putu', 'Putu denny dermawan', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 26, 0, 1),
(77, 'Putri', 'Siti khodijah putri dermawan', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 26, 0, 0, 1),
(78, 'Tumiyati', 'Tumiyati', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6281336290474', '', '', '', '', 0, 27, 0, 1),
(79, 'firdaus', 'Moh. Tomy Dzikri Firdaus', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 27, 0, 0, 1),
(80, 'Uul', 'Fazriya mas\'ula Soffah', 'Jl. Condrodimuka No. 49 Ambulu Jember', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '81336151788', '', '', '', '', 27, 28, 0, 1),
(81, 'ali', 'M. Ali Bahrudin', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6281234003892', '', '', '', '', 0, 28, 0, 1),
(82, 'aish', 'Alifa Aish Dzakira Aftani', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6285649061596', '', '', '', '', 28, 0, 0, 1),
(83, 'fendi', 'Moh. Sofyan Efendi', 'Jl. Argopuro 170 Klompangan Jember', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '681333644144', '', '', '', '', 32, 29, 0, 1),
(84, 'Indriyani', 'Indriyani', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6285655934868', '', '', '', '', 0, 29, 0, 1),
(85, 'Pita', 'Hary puspita wijayanti', 'Jl. Argopuro 170 Klompangan Jember', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6285258712395', '', '', '', '', 32, 30, 0, 1),
(86, 'Tukiman', 'Tukiman', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 30, 0, 1),
(87, 'Riki', 'Riki eka wijaya', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 30, 0, 0, 1),
(88, 'fajar', 'M. Fajar Ramadhan', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 30, 0, 0, 1),
(89, 'Zahraniah', 'Zahraniah nur annisa', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 29, 0, 0, 1),
(90, 'arief', 'Moh. Arief tri wibowo', 'Jl. Argopuro 170 Klompangan Jember', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6281333644144', '', '', '', '', 32, 33, 0, 1),
(91, 'annisah', 'Annisah', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 33, 0, 1),
(92, 'ayu', 'Ida ayu kusumaningrum', 'JL. Argopuro 170 Klompangan Jember', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '628993591033', '', '', '', '', 32, 31, 0, 1),
(93, 'aisyah', 'Sandra aisyah maharani arifin', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 31, 0, 0, 1),
(94, 'arifin', 'M. Zainul Arifin', '', 'l', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '', '', '', '', 0, 31, 0, 1),
(95, 'elok', 'Elok aprilia imroatus sholikha', 'Jl. Diponegoro Gang V No 30 Kauman Ambulu', 'p', '2021-11-05 17:00:00', '0000-00-00 00:00:00', '685335437903', '', '', '', '', 19, 0, 0, 1),
(96, 'Mimin', 'Djamilah nurul laila', '', 'p', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '6282335131858', '', '', '', '', 0, 32, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sl_relasi`
--

CREATE TABLE `sl_relasi` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sl_relasi`
--

INSERT INTO `sl_relasi` (`id`) VALUES
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22),
(23),
(24),
(25),
(26),
(27),
(28),
(29),
(30),
(31),
(32),
(33);

-- --------------------------------------------------------

--
-- Table structure for table `tk_anggota`
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
  `setuju` int(11) NOT NULL DEFAULT 1,
  `aktif` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tk_anggota`
--

INSERT INTO `tk_anggota` (`id`, `user_name`, `password`, `alamat`, `email`, `lapak`, `deskripsi`, `wa`, `setuju`, `aktif`) VALUES
(23, 'auni', '3f53fb7361b40b91c9c11e0d96e109a8', 'Taman Melati Blok Fe 07', 'rokhman.fajar@gmail.com', 'auni store', 'menjual produk herbal, madu, spons ajaib, dll', '6281287060297', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tk_barang`
--

CREATE TABLE `tk_barang` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `deskripsi` varchar(500) DEFAULT NULL,
  `desk_panjang` text DEFAULT NULL,
  `harga` int(11) NOT NULL,
  `anggota_id` int(11) NOT NULL,
  `publish` int(11) NOT NULL,
  `jml_view` int(11) NOT NULL,
  `tgl_update` timestamp NOT NULL DEFAULT current_timestamp(),
  `thumb` varchar(255) NOT NULL DEFAULT '/gbr/kosong.png',
  `gbr` varchar(255) NOT NULL DEFAULT '/gbr/kosong.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tk_barang`
--

INSERT INTO `tk_barang` (`id`, `nama`, `deskripsi`, `desk_panjang`, `harga`, `anggota_id`, `publish`, `jml_view`, `tgl_update`, `thumb`, `gbr`) VALUES
(23, 'Madu Yaman sidr grade B 1 kg', 'Madu Yaman Sidr Grade 1 Kg', '<p>Madu Yaman Sidr Grade B 1 kg</p>', 800000, 23, 3, 10, '2021-11-28 04:08:46', 'thumb_ZV4Q3OPX2021_10_28_10_13_55_835.png', 'gbr_ZV4Q3OPX2021_10_28_10_13_55_835.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sl_admin`
--
ALTER TABLE `sl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sl_anggota`
--
ALTER TABLE `sl_anggota`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sl_relasi`
--
ALTER TABLE `sl_relasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tk_anggota`
--
ALTER TABLE `tk_anggota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_idx` (`email`),
  ADD UNIQUE KEY `wa_idx` (`wa`),
  ADD UNIQUE KEY `user_name_idx` (`user_name`);

--
-- Indexes for table `tk_barang`
--
ALTER TABLE `tk_barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barang_anggota` (`anggota_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sl_admin`
--
ALTER TABLE `sl_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sl_anggota`
--
ALTER TABLE `sl_anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `sl_relasi`
--
ALTER TABLE `sl_relasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tk_anggota`
--
ALTER TABLE `tk_anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tk_barang`
--
ALTER TABLE `tk_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tk_barang`
--
ALTER TABLE `tk_barang`
  ADD CONSTRAINT `barang_anggota` FOREIGN KEY (`anggota_id`) REFERENCES `tk_anggota` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
