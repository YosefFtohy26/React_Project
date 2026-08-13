import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// استيراد الأيقونات بنفس المسار
import graduationCapIcon from '../../assets/icons/graduation-cap.svg';
import calendarDaysIcon from '../../assets/icons/calendar-days.svg';
import chartColumnBigIcon from '../../assets/icons/chart-column-big.svg';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language.startsWith('ar');

  return (
    <div className="hero-wrapper position-relative mb-5">
      {/* الهيرو الرئيسي */}
      <section className="hero-section text-white text-center px-3">
        <div className="container max-w-container-max pb-5">
          <h1 className="display-4 fw-bold mb-3">{t('home.hero_title')}</h1>
          <p className="lead mx-auto mb-4 opacity-90" style={{ maxWidth: '720px' }}>
            {t('home.hero_subtitle')}
          </p>
          <div className="d-flex flex-sm-row flex-column gap-3 justify-content-center">
            <Link to="/contact" className="btn btn-info text-dark fw-bold px-4 py-2 rounded-3">
              {t('home.apply_now')}
            </Link>
            <Link to="/programs" className="btn btn-outline-light px-4 py-2 rounded-3">
              {t('home.discover_programs')}
            </Link>
          </div>
        </div>
      </section>

      {/* الكارت العائم فوق الهيرو */}
      <div className="hero-floating-card container position-relative">
        <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
          <div className="row g-4 align-items-center">
            
            {/* العمود الأول: البرامج */}
            <div className="col-12 col-md-4 pe-md-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <img src={graduationCapIcon} alt="Graduation Cap" width="24" height="24" />
                <h5 className="fw-bold text-primary-custom mb-0">{t('home.our_programs_title')}</h5>
              </div>
              <p className="text-secondary small mb-3 lh-sm">
                {t('home.our_programs_desc')}
              </p>
              <Link 
                to="/programs" 
                className="text-primary-custom fw-bold extra-small text-decoration-none d-inline-flex align-items-center gap-1 text-uppercase"
              >
                <span>{t('home.view_all_programs')}</span>
                {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </Link>
            </div>

            {/* العمود الثاني: الفعاليات القادمة */}
            <div className="col-12 col-md-4 px-md-4 border-start-md border-end-md">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={calendarDaysIcon} alt="Calendar" width="22" height="22" />
                <h5 className="fw-bold text-primary-custom mb-0">{t('home.upcoming_events_title')}</h5>
              </div>
              <div className="bg-surface-muted p-3 rounded-3">
                <span className="text-data-cyan fw-bold extra-small d-block text-uppercase mb-1">
                  {t('home.event_date')}
                </span>
                <h6 className="fw-bold text-primary-custom mb-1 fs-6">
                  {t('home.event_title')}
                </h6>
                <span className="text-muted extra-small">{t('home.event_location')}</span>
              </div>
            </div>

            {/* العمود الثالث: الإحصائيات والأرقام الرسمية */}
            <div className="col-12 col-md-4 ps-md-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={chartColumnBigIcon} alt="Statistics" width="22" height="22" />
                <h5 className="fw-bold text-primary-custom mb-0">{t('home.by_numbers_title')}</h5>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <div className="fw-bold fs-4 text-primary-custom lh-1">6</div>
                  <span className="text-muted extra-small text-uppercase fw-semibold">{t('stats.programs')}</span>
                </div>
                <div className="col-6">
                  <div className="fw-bold fs-4 text-primary-custom lh-1">2</div>
                  <span className="text-muted extra-small text-uppercase fw-semibold">{t('stats.departments')}</span>
                </div>
                <div className="col-6">
                  <div className="fw-bold fs-4 text-primary-custom lh-1">{t('stats.qs_rank_val')}</div>
                  <span className="text-muted extra-small text-uppercase fw-semibold">{t('stats.qs_rank_label')}</span>
                </div>
                <div className="col-6">
                  <div className="fw-bold fs-4 text-primary-custom lh-1">2</div>
                  <span className="text-muted extra-small text-uppercase fw-semibold">{t('stats.grad_cohorts')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};