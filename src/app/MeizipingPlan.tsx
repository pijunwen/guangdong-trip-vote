const dayOne = [
  ["06:45", "花都新华集合、分车和装备检查，提前加满油。"],
  ["07:00", "出发前往上坪村，含短暂停靠按 3 小时预留。"],
  ["10:00", "抵达上坪村，停车、热身、核对离线轨迹。"],
  ["10:20", "开始 8–9 公里环线，领队在前、收队在后。"],
  ["12:45", "阴凉处路餐，不开火，垃圾全部带走。"],
  ["15:30", "陆续返回上坪村，拉伸、换干衣并清点人员。"],
  ["16:45", "前往阳山县城，以实时导航为准。"],
  ["19:00", "阳山鸡、阳山豆腐聚餐，司机不饮酒。"],
];

const dayTwo = [
  ["08:30", "自然醒和早餐，检查膝踝与疲劳状态。"],
  ["10:30", "退房，在县城轻松散步或买特产。"],
  ["12:00", "午餐，驾驶员保持清醒。"],
  ["13:30", "错峰返广州，途中至少休息一次。"],
  ["17:00", "预计抵达广州；拥堵时可能更晚。"],
];

const essentials = [
  "有抓地纹的徒步鞋或越野跑鞋，不能穿光底板鞋",
  "饮用水 1.5–2L，加 500ml 电解质饮料",
  "一顿路餐、两份快速能量补给",
  "速干衣裤、备用干上衣和袜子",
  "遮阳帽、防晒霜、轻便雨衣",
  "头灯、充电宝、离线地图和 GPX 轨迹",
  "登山杖、个人常用药、垃圾袋",
];

const cancelRules = [
  "阳山或江英镇出现雷暴、暴雨、大风、地质灾害黄色及以上预警",
  "徒步时段持续降雨，或过去 24–48 小时已有明显降雨",
  "最高温预计达到 34℃ 及以上，不用提前出发硬扛高温",
  "村道封闭、入口限制或无法确认车辆可安全抵达",
  "缺少离线轨迹、领队/收队、急救包或清醒司机",
  "队员出现发热、腹泻、急性扭伤或旧伤加重",
];

function MeizipingPlan() {
  return (
    <div className="app-shell plan-shell">
      <header className="app-nav">
        <div className="app-nav__left">
          <a className="app-nav__icon-button plan-nav__back" href="./" aria-label="返回投票">
            <span className="app-nav__back-icon" aria-hidden="true" />
          </a>
        </div>
        <h1 className="app-nav__title">梅子坪古道徒步方案</h1>
      </header>

      <main className="app-page app-page--with-bottom-bar plan-page">
        <section className="plan-hero">
          <span className="tag tag--primary">推荐 2天1晚</span>
          <h2>古道、石林和朋友局</h2>
          <p>花都新华出发，默认走上坪村起终点环线。按年轻人中等节奏规划，不赶路、不摸黑、不把长线当默认。</p>
          <div className="plan-hero__meta">
            <span className="route-chip">9月26–27日</span>
            <span className="route-chip">4–12人</span>
            <span className="route-chip">自驾拼车</span>
          </div>
        </section>

        <section className="plan-card">
          <h2>路线卡片</h2>
          <p className="plan-card__caption">导航：阳山县江英镇上坪村党群服务中心</p>
          <dl className="plan-facts">
            <div><dt>距离</dt><dd>约 8–9 公里</dd></div>
            <div><dt>累计爬升</dt><dd>约 340–355 米</dd></div>
            <div><dt>徒步时间</dt><dd>约 3–5 小时</dd></div>
            <div><dt>整体预留</dt><dd>约 5–6 小时</dd></div>
          </dl>
          <p className="plan-card__caption">新华街道至入口当前地图路线约 179 公里、2 小时 37 分钟，高速费参考 ¥79；行程按 3 小时预留。</p>
        </section>

        <aside className="plan-callout">
          <strong>为什么不选长穿越</strong>
          14–15 公里长线累计爬升约 700 米，属于全天路线。人数、体力和户外经验未确认前，不作为朋友局默认方案。
        </aside>

        <section className="plan-card">
          <h2>Day 1｜徒步与聚餐</h2>
          <p className="plan-card__caption">广州 → 上坪村 → 梅子坪古道 → 阳山县城</p>
          <ol className="plan-timeline">
            {dayOne.map(([time, description]) => (
              <li key={time}><time>{time}</time><p>{description}</p></li>
            ))}
          </ol>
        </section>

        <aside className="plan-callout">
          <strong>硬截止：10:45</strong>
          10:45 仍未开始徒步，就不再硬走完整环线，改成县城休闲或择日再走。
        </aside>

        <section className="plan-card">
          <h2>Day 2｜休整后错峰回程</h2>
          <p className="plan-card__caption">阳山县城 → 广州</p>
          <ol className="plan-timeline">
            {dayTwo.map(([time, description]) => (
              <li key={time}><time>{time}</time><p>{description}</p></li>
            ))}
          </ol>
        </section>

        <section className="plan-card">
          <h2>人均费用估算</h2>
          <p className="plan-card__caption">按 3–4 人一车、2 人一间；实际多退少补</p>
          <table className="plan-budget" aria-label="2天1晚每人费用参考">
            <thead><tr><th scope="col">项目</th><th scope="col">参考</th></tr></thead>
            <tbody>
              <tr><td>油费与路桥</td><td>¥120–220</td></tr>
              <tr><td>住宿</td><td>¥100–250</td></tr>
              <tr><td>餐饮与路餐</td><td>¥150–260</td></tr>
              <tr><td>保险与公共物资</td><td>¥30–80</td></tr>
            </tbody>
            <tfoot><tr><td>合计</td><td>¥400–810</td></tr></tfoot>
          </table>
        </section>

        <section className="plan-card">
          <h2>每个人必须带</h2>
          <ul className="plan-list">
            {essentials.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="plan-card">
          <h2>满足一项就取消或改期</h2>
          <p className="plan-card__caption">出发前一天 20:00 由领队发布最终 Go / No-Go</p>
          <ul className="plan-list plan-list--warning">
            {cancelRules.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="plan-card">
          <h2>出发前仍需确认</h2>
          <ul className="plan-list plan-list--warning">
            <li>入口是否开放，停车容量与收费方式</li>
            <li>临时封路、村道交通管制或进山登记</li>
            <li>近期两条离线轨迹和当天实际路况</li>
            <li>逐小时天气、气象预警和地质灾害风险</li>
          </ul>
        </section>

        <section className="plan-card">
          <h2>核验来源</h2>
          <div className="plan-source-list">
            <a href="https://www.gov.cn/zhengce/content/202511/content_7047090.htm?pc" target="_blank" rel="noreferrer">2026 年节假日安排（中国政府网）</a>
            <a href="https://www.weather.com.cn/weather/101281305.shtml" target="_blank" rel="noreferrer">阳山天气预报（中国天气网）</a>
          </div>
        </section>
      </main>

      <div className="app-bottom-bar plan-bottom-bar">
        <a className="app-button app-button--primary" href="./">返回投票</a>
      </div>
    </div>
  );
}

export default MeizipingPlan;
