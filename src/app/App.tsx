import { useEffect, useMemo, useState } from "react";

type TripRoute = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  duration: string;
  transit: string;
  bestFor: string;
  highlights: string[];
  note: string;
  detailHref?: string;
};

type AvailableDate = {
  id: string;
  date: string;
  weekday: string;
  badge?: string;
};

const routes: TripRoute[] = [
  {
    id: "qingyuan-gulong",
    code: "A",
    name: "清远古龙峡＋温泉",
    tagline: "白天玩刺激，晚上泡温泉放松",
    duration: "2天1晚",
    transit: "广州自驾约1.5-2小时",
    bestFor: "喜欢漂流和团队活动的年轻人",
    highlights: ["峡谷漂流", "玻璃峡谷", "温泉", "聚餐"],
    note: "9月下旬至10月初的漂流开放情况受天气和景区安排影响，确定日期后需再核实",
  },
  {
    id: "qingyuan-meiziping",
    code: "B",
    name: "清远梅子坪古道徒步",
    tagline: "穿过古道、石林和古村的山野线路",
    duration: "1天或2天1晚",
    transit: "广州自驾约2.5-3小时",
    bestFor: "想看喀斯特石林、能接受连续徒步的朋友",
    highlights: ["喀斯特石林", "青石古道", "古村梯田", "山野徒步"],
    note: "常见环线约8-9公里、整体预留5-6小时；雨天青石板湿滑，需穿防滑徒步鞋",
    detailHref: "./meiziping.html",
  },
  {
    id: "shaoguan-danxia",
    code: "C",
    name: "韶关丹霞山",
    tagline: "用一场登山换自然风景和日出",
    duration: "2-3天",
    transit: "高铁约1小时，落地转车约1小时",
    bestFor: "体力较好、喜欢徒步和自然风景",
    highlights: ["丹霞地貌", "登山徒步", "日出", "粤北美食"],
    note: "强度高于其他路线，建议先确认大家是否愿意早起和爬山",
  },
];

const availableDates: AvailableDate[] = [
  { id: "2026-09-25", date: "9月25日", weekday: "周五", badge: "中秋" },
  { id: "2026-09-26", date: "9月26日", weekday: "周六" },
  { id: "2026-09-27", date: "9月27日", weekday: "周日" },
  { id: "2026-09-28", date: "9月28日", weekday: "周一" },
  { id: "2026-09-29", date: "9月29日", weekday: "周二" },
  { id: "2026-09-30", date: "9月30日", weekday: "周三" },
  { id: "2026-10-01", date: "10月1日", weekday: "周四", badge: "国庆" },
  { id: "2026-10-02", date: "10月2日", weekday: "周五" },
  { id: "2026-10-03", date: "10月3日", weekday: "周六" },
  { id: "2026-10-04", date: "10月4日", weekday: "周日" },
  { id: "2026-10-05", date: "10月5日", weekday: "周一" },
  { id: "2026-10-06", date: "10月6日", weekday: "周二" },
  { id: "2026-10-07", date: "10月7日", weekday: "周三" },
];

const ROUTE_STORAGE_KEY = "guangdong-trip-routes-v2";
const DATE_STORAGE_KEY = "guangdong-trip-dates-v2";

const readStoredIds = (key: string, validIds: string[]) => {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter(
          (value): value is string => typeof value === "string" && validIds.includes(value)
        )
      : [];
  } catch {
    return [];
  }
};

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    readStoredIds(ROUTE_STORAGE_KEY, routes.map((route) => route.id))
  );
  const [selectedDateIds, setSelectedDateIds] = useState<string[]>(() =>
    readStoredIds(DATE_STORAGE_KEY, availableDates.map((date) => date.id))
  );
  const [toast, setToast] = useState("");

  useEffect(() => {
    window.localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    window.localStorage.setItem(DATE_STORAGE_KEY, JSON.stringify(selectedDateIds));
  }, [selectedDateIds]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selectedRoutes = useMemo(
    () => routes.filter((route) => selectedIds.includes(route.id)),
    [selectedIds]
  );
  const selectedDates = useMemo(
    () => availableDates.filter((date) => selectedDateIds.includes(date.id)),
    [selectedDateIds]
  );
  const canCopy = selectedRoutes.length > 0 && selectedDates.length > 0;
  const hasSelection = selectedIds.length > 0 || selectedDateIds.length > 0;

  const toggleSelection = (
    value: string,
    setSelection: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelection((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const copyVote = async () => {
    if (!canCopy) return;
    const lines = [
      "清远与韶关旅行投票",
      "",
      "想去的路线：",
      ...selectedRoutes.map((route) => `${route.code}. ${route.name}（${route.duration}）`),
      "",
      "有空的日期：",
      ...selectedDates.map(
        (date) => `${date.date} ${date.weekday}${date.badge ? `（${date.badge}）` : ""}`
      ),
    ];

    if (
      selectedIds.includes("qingyuan-gulong") &&
      selectedIds.includes("qingyuan-meiziping")
    ) {
      lines.push("", "两个清远选项都去建议安排3天2晚。");
    }

    const result = lines.join("\n");

    try {
      await navigator.clipboard.writeText(result);
      setToast("投票结果已复制");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = result;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setToast("投票结果已复制");
    }
  };

  return (
    <div className="app-shell travel-shell">
      <header className="app-nav">
        <h1 className="app-nav__title">清远与韶关旅行投票</h1>
      </header>

      <main className="app-page app-page--with-bottom-bar travel-page">
        <section className="travel-intro" aria-labelledby="travel-title">
          <span className="tag tag--primary">广州出发</span>
          <h2 id="travel-title">路线和时间一起选</h2>
          <p>先选想去的路线，再勾选2026年9月25日至10月7日所有有空的日期，均可多选。</p>
        </section>

        <div className="travel-summary" aria-live="polite">
          <span>共 3 条候选路线</span>
          <strong>已选 {selectedIds.length} 条</strong>
        </div>

        <section className="route-list" aria-label="候选路线">
          {routes.map((route) => {
            const selected = selectedIds.includes(route.id);
            return (
              <article
                className={`route-card${selected ? " route-card--selected" : ""}`}
                key={route.id}
              >
                <button
                  className="route-card__toggle"
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleSelection(route.id, setSelectedIds)}
                >
                  <span className="route-card__select" aria-hidden="true">
                    {selected ? "✓" : route.code}
                  </span>
                  <span className="route-card__content">
                    <span className="route-card__heading">
                      <span className="route-card__name">{route.name}</span>
                    </span>
                    <span className="route-card__tagline">{route.tagline}</span>
                    <span className="route-card__facts">
                      <span>{route.duration}</span>
                      <span>{route.transit}</span>
                    </span>
                    <span className="route-card__fit">适合：{route.bestFor}</span>
                    <span className="route-card__highlights">
                      {route.highlights.map((highlight) => (
                        <span className="route-chip" key={highlight}>{highlight}</span>
                      ))}
                    </span>
                    <span className="route-card__note">注意：{route.note}</span>
                  </span>
                </button>
                {route.detailHref && (
                  <a className="route-card__detail" href={route.detailHref}>
                    查看详细行程
                    <span aria-hidden="true">›</span>
                  </a>
                )}
              </article>
            );
          })}
        </section>

        <section className="app-card availability-card" aria-labelledby="availability-title">
          <div className="availability-card__header">
            <div>
              <h2 className="app-title" id="availability-title">哪些日期有空</h2>
              <p className="app-caption">2026-09-25 至 2026-10-07，可多选</p>
            </div>
            <strong>{selectedDateIds.length} 天</strong>
          </div>
          <div className="date-grid">
            {availableDates.map((date) => {
              const selected = selectedDateIds.includes(date.id);
              return (
                <button
                  className={`date-option${selected ? " date-option--selected" : ""}`}
                  type="button"
                  key={date.id}
                  aria-pressed={selected}
                  aria-label={`${date.date} ${date.weekday}${date.badge ? ` ${date.badge}` : ""}`}
                  onClick={() => toggleSelection(date.id, setSelectedDateIds)}
                >
                  <span className="date-option__date">{date.date}</span>
                  <span className="date-option__meta">
                    <span>{date.weekday}</span>
                    {date.badge && <span className="date-option__badge">{date.badge}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="alert alert--info travel-tip">
          两个清远选项可以一起去，但古龙峡到梅子坪所在的阳山江英镇道路估算约123公里、正常约1小时40分。节假日建议按3天2晚安排；若只有2天1晚，选其一会更轻松。
        </section>
      </main>

      <div className="app-bottom-bar travel-bottom-bar">
        <div className="travel-bottom-bar__summary">
          <span>路线<strong>{selectedIds.length}</strong></span>
          <span>日期<strong>{selectedDateIds.length}</strong></span>
        </div>
        <button
          className="app-text-link travel-reset"
          type="button"
          disabled={!hasSelection}
          onClick={() => {
            setSelectedIds([]);
            setSelectedDateIds([]);
          }}
        >
          重新选择
        </button>
        <button
          className="app-button app-button--primary travel-copy"
          type="button"
          disabled={!canCopy}
          onClick={copyVote}
        >
          复制结果
        </button>
      </div>

      {toast && <div className="travel-toast" role="status">{toast}</div>}
    </div>
  );
}

export default App;
