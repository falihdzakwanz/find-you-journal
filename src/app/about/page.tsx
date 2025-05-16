export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Tentang Aplikasi</h1>

      <p className="text-gray-700 mb-4">
        <strong>Personal Growth Journal</strong> adalah aplikasi jurnal harian
        yang dirancang untuk membantu kamu merefleksikan diri, mengelola emosi,
        dan tumbuh secara pribadi melalui kebiasaan menulis secara rutin.
      </p>

      <p className="text-gray-700 mb-4">
        Dengan fitur seperti pertanyaan harian yang memancing pemikiran dan
        kemampuan untuk menambahkan pertanyaan sendiri, kamu dapat membuat
        proses menulis menjadi lebih bermakna dan terarah.
      </p>

      <p className="text-gray-700 mb-6">
        Data jurnal kamu disimpan secara pribadi dan aman, hanya bisa diakses
        oleh kamu sendiri. Kami menghargai privasi dan berkomitmen untuk
        menyediakan ruang refleksi yang aman.
      </p>

      {/* Visi Misi */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Visi</h2>
        <p className="text-gray-700 mb-4">
          Menjadi platform refleksi diri yang membantu generasi digital menjaga
          kesehatan mental dan meningkatkan kualitas hidup melalui journaling.
        </p>

        <h2 className="text-xl font-semibold mb-2">Misi</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Mendorong kebiasaan menulis reflektif yang positif.</li>
          <li>Menyediakan fitur journaling yang fleksibel dan aman.</li>
          <li>Memberikan inspirasi harian melalui pertanyaan pemantik.</li>
          <li>Mempermudah akses journaling bagi siapa pun dan di mana pun.</li>
        </ul>
      </section>

      {/* Fitur */}
      <h2 className="text-xl font-semibold mb-2">Fitur Utama</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1 mb-10">
        <li>Menulis jurnal harian dengan pertanyaan pemantik</li>
        <li>Menyimpan dan melihat riwayat tulisan</li>
        <li>Menambahkan pertanyaan khusus</li>
        <li>Edit dan hapus entri dengan mudah</li>
      </ul>

      {/* Testimoni */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Apa Kata Pengguna</h2>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-700 italic">
            “Sejak pakai aplikasi ini, aku jadi lebih sadar akan perasaan
            sendiri. Pertanyaan hariannya benar-benar membantu proses refleksi.”
            <span className="block mt-1 text-sm text-gray-500">
              – Alifa, 22 tahun
            </span>
          </blockquote>
          <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-700 italic">
            “Fitur tambah pertanyaan sendiri itu keren banget! Jadi bisa
            disesuaikan dengan kebutuhan refleksi pribadi.”
            <span className="block mt-1 text-sm text-gray-500">
              – Raka, 25 tahun
            </span>
          </blockquote>
        </div>
      </section>

      {/* Tentang Pengembang */}
      <h2 className="text-xl font-semibold mb-2">Tentang Pengembang</h2>
      <p className="text-gray-700 mb-4">
        Aplikasi ini dikembangkan oleh <strong>[Nama Kamu]</strong>, mahasiswa
        Teknik Informatika yang tertarik pada pengembangan web,
        self-development, dan pemanfaatan teknologi untuk kebaikan pribadi.
      </p>
      <p className="text-gray-700 mb-4">
        Proyek ini dibuat sebagai sarana pembelajaran sekaligus upaya nyata
        mendukung praktik journaling yang lebih konsisten dan terstruktur.
      </p>
      <p className="text-gray-700">
        Dibuat dengan ❤️ menggunakan Next.js, Firebase, dan NextAuth.
      </p>
    </main>
  );
}
