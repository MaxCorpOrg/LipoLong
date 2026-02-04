import Image from "next/image";

export const metadata = {
  title: "Описание препарата LipoLong",
  description: "Состав и подробное описание препарата LipoLong.",
};

export default function DescriptionPage() {
  return (
    <main className="description-page photo-scroll-bg">
      <section className="description-shell">
        <header className="description-hero">
          <div className="hero-logo-wrap">
            <Image
              src="/Logo.png"
              alt="LipoLong"
              width={720}
              height={520}
              className="hero-logo-image"
              priority
            />
          </div>
          <div className="description-head">
            <h1 className="s2-title text-3xl md:text-5xl font-extrabold text-cyan-200">Описание препарата</h1>
            <p className="description-sub">
              Инновационный мезококтейль-липолитик нового поколения с выраженным лифтинг-эффектом и высокой
              селективностью действия.
            </p>
          </div>
        </header>

        <div className="description-grid">
          <article className="glass-card description-text-card">
            <h2 className="description-section-title">Состав</h2>
            <p className="description-text">
              Гиалуронат натрия 6 мг/мл, аминокислотный комплекс LipoLong 4 мг/мл, натрия хлорид 8 мг/мл, натрия
              цитрат дигидрат 2 мг/мл.
            </p>

            <h3 className="description-section-title">Подробнее</h3>
            <p className="description-text">
              Мезококтейль-липолитик LipoLong представляет собой препарат нового поколения в косметологии. В основе
              действующего вещества состоит инновационный аминокислотный комплекс, способный избирательно
              связываться с адипоцитами (жировыми клетками), активизируя внутриклеточные ферменты липазы, что
              способствует мобилизации триглицеридов жировой клетки с дальнейшим их катаболизмом.
            </p>
            <p className="description-text">
              Простыми словами молекула действующего вещества связывается с жировой клеткой, стимулируя её на
              высвобождение и последующее расщепление запасённого в ней жира. Под воздействием аминокислотного
              комплекса адипоциты значительно уменьшаются в размерах ввиду истощения запасов жира (триглицеридов)
              внутри клетки, а также входят в состояние «клеточного ареста» (происходит блокирование процесса
              накопления внутри клетки жиров (триглицеридов).
            </p>
            <p className="description-text">
              Также входящие в состав компоненты препарата способствуют синтезу коллагена, что даёт выраженный
              лифтинг эффект в зоне применения. Безопасность препарата обуславливается высокой селективностью
              молекул действующего вещества (препарат способен воздействовать только на жировые клетки в местах
              применения) и отсутствием в составе токсичных веществ (дезоксихолат натрия и др.), приводящих к
              негативным местным и системным реакциям в организме.
            </p>
            <p className="description-text">
              Таким образом LipoLong позволяет добиться невероятных результатов часто уже после первого применения.
            </p>
            <ul className="description-list">
              <li>Простая процедура и лёгкая техника применения.</li>
              <li>Подходит для всех участков тела.</li>
            </ul>
          </article>

          <aside className="glass-card description-media-card">
            <div className="description-pack-frame">
              <Image
                src="/images/pack-placeholder.webp"
                alt="Упаковка LipoLong"
                width={520}
                height={520}
                className="description-pack-image"
                priority
              />
            </div>
            <div className="description-pack-caption">
              <p className="description-pack-title">Упаковка LipoLong</p>
              <p className="description-pack-text">2 флакона по 4 мл. Хранить при t° 2–25°С, защищать от света.</p>
            </div>
            <a href="/order" className="btn-buy-primary" role="button">
              Купить LipoLong
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
