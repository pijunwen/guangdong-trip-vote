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
  recommended?: boolean;
};

const routes: TripRoute[] = [
  {
    id: "chaoshan",
    code: "A",
    name: "潮州＋汕头＋南澳岛",
    tagline: "美食、人文和海岛一次满足",
    duration: "3天2晚",
    transit: "高铁约2-3小时，落地租车或包车",
    bestFor: "第一次组局、口味难统一的朋友群",
    highlights: ["潮州古城", "牛肉火锅", "汕头小公园", "南澳岛环岛"],
    note: "整体最均衡，但南澳岛周末车流较多，建议早出发",
    recommended: true,
  },
  {
    id: "huizhou",
    code: "B",
    name: "惠州双月湾＋盐洲岛",
    tagline: "包栋、看海、烧烤，组团氛围最好",
    duration: "2天1晚",
    transit: "广州自驾约2.5-3.5小时",
    bestFor: "4人以上、想住在一起玩到晚",
    highlights: ["海景民宿", "日落海滩", "海鲜晚餐", "别墅聚会"],
    note: "周末沿海公路容易拥堵，返程尽量避开傍晚高峰",
  },
  {
    id: "zhuhai",
    code: "C",
    name: "珠海＋外伶仃岛",
    tagline: "路程轻松，适合慢节奏海岛周末",
    duration: "2-3天",
    transit: "城轨约1-1.5小时，再转轮船",
    bestFor: "不想长途自驾、偏爱海岛和拍照",
    highlights: ["海岛徒步", "礁石日落", "海鲜", "珠海夜景"],
    note: "船班受风浪影响，确定日期后需要复核并提前购票",
  },
  {
    id: "qingyuan",
    code: "D",
    name: "清远古龙峡＋温泉",
    tagline: "白天玩刺激，晚上泡温泉放松",
    duration: "2天1晚",
    transit: "广州自驾约1.5-2小时",
    bestFor: "喜欢漂流和团队活动的年轻人",
    highlights: ["峡谷漂流", "玻璃峡谷", "温泉", "聚餐"],
    note: "漂流属于季节项目，开放情况取决于出发日期和天气",
  },
  {
    id: "shaoguan",
    code: "E",
    name: "韶关丹霞山",
    tagline: "用一场登山换自然风景和日出",
    duration: "2-3天",
    transit: "高铁约1小时，落地转车约1小时",
    bestFor: "体力较好、喜欢徒步和自然风景",
    highlights: ["丹霞地貌", "登山徒步", "日出", "粤北美食"],
    note: "强度高于其他路线，建议先确认大家是否愿意早起和爬山",
  },
];

const STORAGE_KEY = "guangdong-trip-vote";

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selectedRoutes = useMemo(
    () => routes.filter((route) => selectedIds.includes(route.id)),
    [selectedIds]
  );

  const toggleRoute = (routeId: string) => {
    setSelectedIds((current) =>
      current.includes(routeId)
        ? current.filter((id) => id !== routeId)
        : [...current, routeId]
    );
  };

  const copyVote = async () => {
    if (selectedRoutes.length === 0) return;
    const result = [
      "广东省内旅行投票",
      ...selectedRoutes.map((route) => `${route.code}. ${route.name}（${route.duration}）`),
      "我可以接受以上路线，大家继续投票。",
    ].join("\n");

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
        <h1 className="app-nav__title">广东省内旅行投票</h1>
      </header>

      <main className="app-page app-page--with-bottom-bar travel-page">
        <section className="travel-intro" aria-labelledby="travel-title">
          <span className="tag tag--primary">广州出发</span>
          <h2 id="travel-title">这次去哪玩</h2>
          <p>都是年轻人，人数和日期暂未确定。先选喜欢的路线，可多选。</p>
        </section>

        <div className="travel-summary" aria-live="polite">
          <span>共 5 条候选路线</span>
          <strong>已选 {selectedIds.length} 条</strong>
        </div>

        <section className="route-list" aria-label="候选路线">
          {routes.map((route) => {
            const selected = selectedIds.includes(route.id);
            return (
              <button
                className={`route-card${selected ? " route-card--selected" : ""}`}
                type="button"
                key={route.id}
                aria-pressed={selected}
                onClick={() => toggleRoute(route.id)}
              >
                <span className="route-card__select" aria-hidden="true">
                  {selected ? "✓" : route.code}
                </span>
                <span className="route-card__content">
                  <span className="route-card__heading">
                    <span className="route-card__name">{route.name}</span>
                    {route.recommended && <span className="tag tag--success">推荐</span>}
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
            );
          })}
        </section>

        <section className="alert alert--info travel-tip">
          先选目的地。确定日期后，再核对高铁、船班、天气和漂流开放情况。
        </section>
      </main>

      <div className="app-bottom-bar travel-bottom-bar">
        <div className="travel-bottom-bar__summary">
          <span>已选</span>
          <strong>{selectedIds.length}</strong>
        </div>
        <button
          className="app-text-link travel-reset"
          type="button"
          disabled={selectedIds.length === 0}
          onClick={() => setSelectedIds([])}
        >
          重新选择
        </button>
        <button
          className="app-button app-button--primary travel-copy"
          type="button"
          disabled={selectedIds.length === 0}
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
