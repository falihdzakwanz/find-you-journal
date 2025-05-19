export default function AboutPage() {
  return (
    <main className="max-w-3xl px-4 py-10 mx-auto text-justify sm:px-6 lg:px-8">
      <h1 className="mb-8 text-base text-3xl font-bold sm:text-4xl">
        Tentang Aplikasi
      </h1>

      <p className="mb-5 text-base sm:text-lg">
        <strong>Hug Space</strong> adalah aplikasi jurnal harian yang dirancang
        untuk membantu kamu merefleksikan diri, mengelola emosi, dan tumbuh
        secara pribadi melalui kebiasaan menulis secara rutin.
      </p>

      <p className="mb-5 text-base sm:text-lg">
        Dengan fitur seperti pertanyaan harian yang memancing pemikiran dan
        kemampuan untuk menambahkan pertanyaan sendiri, kamu dapat membuat
        proses menulis menjadi lebih bermakna dan terarah.
      </p>

      <p className="mb-10 text-base sm:text-lg">
        Data jurnal kamu disimpan secara pribadi dan aman, hanya bisa diakses
        oleh kamu sendiri. Kami menghargai privasi dan berkomitmen untuk
        menyediakan ruang refleksi yang aman.
      </p>

      {/* Visi Misi */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">Visi</h2>
        <p className="mb-6 text-base sm:text-lg">
          Menjadi platform refleksi diri yang membantu generasi digital menjaga
          kesehatan mental dan meningkatkan kualitas hidup melalui journaling.
        </p>

        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">Misi</h2>
        <ul className="pl-5 mb-6 space-y-2 text-base list-disc sm:text-lg">
          <li>Mendorong kebiasaan menulis reflektif yang positif.</li>
          <li>Menyediakan fitur journaling yang fleksibel dan aman.</li>
          <li>Memberikan inspirasi harian melalui pertanyaan pemantik.</li>
          <li>Mempermudah akses journaling bagi siapa pun dan di mana pun.</li>
        </ul>
      </section>

      {/* Fitur */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
          Fitur Utama
        </h2>
        <ul className="pl-5 space-y-2 text-base list-disc sm:text-lg">
          <li>Menulis jurnal harian dengan pertanyaan pemantik</li>
          <li>Menyimpan dan melihat riwayat tulisan</li>
          <li>Menambahkan pertanyaan khusus</li>
          <li>Edit dan hapus entri dengan mudah</li>
        </ul>
      </section>

      {/* Testimoni */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
          Apa Kata Pengguna
        </h2>
        <div className="space-y-6">
          <blockquote className="pl-4 text-base italic border-l-4 border-accent sm:text-lg">
            “Sejak pakai aplikasi ini, aku jadi lebih sadar akan perasaan
            sendiri. Pertanyaan hariannya benar-benar membantu proses refleksi.”
            <span className="block mt-2 text-sm text-gray-500 sm:text-base">
              – Alifa, 22 tahun
            </span>
          </blockquote>
          <blockquote className="pl-4 text-base italic border-l-4 border-accent sm:text-lg">
            “Fitur tambah pertanyaan sendiri itu keren banget! Jadi bisa
            disesuaikan dengan kebutuhan refleksi pribadi.”
            <span className="block mt-2 text-sm text-gray-500 sm:text-base">
              – Raka, 25 tahun
            </span>
          </blockquote>
        </div>
      </section>

      {/* Tentang Pengembang */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
          Tentang Pengembang
        </h2>
        <p className="mb-4 text-base sm:text-lg">
          Aplikasi ini dikembangkan oleh <strong>[Nama Kamu]</strong>, mahasiswa
          Teknik Informatika yang tertarik pada pengembangan web,
          self-development, dan pemanfaatan teknologi untuk kebaikan pribadi.
        </p>
        <p className="mb-4 text-base sm:text-lg">
          Proyek ini dibuat sebagai sarana pembelajaran sekaligus upaya nyata
          mendukung praktik journaling yang lebih konsisten dan terstruktur.
        </p>
        <p className="text-base sm:text-lg">
          Dibuat dengan ❤️ menggunakan Next.js, Firebase, dan NextAuth.
        </p>
      </section>
    </main>
  );
}
