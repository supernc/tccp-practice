import { ChapterInfo } from '../types';

const WIKI_BASE = 'https://angelsnow1129.github.io/TCCPWiki';

export const chapters: ChapterInfo[] = [
  {
    id: 1,
    name: '云架构设计基础',
    description: '云计算定义、服务模型、部署模型、架构设计原则',
    weight: 4,
    wikiUrl: `${WIKI_BASE}/chapter1/1.1_%E4%BA%91%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E6%A6%82%E8%AE%BA/`,
    subChapters: [
      { id: 'ch1-arch', name: '云架构设计概论', wikiUrl: `${WIKI_BASE}/chapter1/1.1_%E4%BA%91%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E6%A6%82%E8%AE%BA/` },
    ],
  },
  {
    id: 2,
    name: '腾讯云核心产品与服务',
    description: 'CVM、VPC、CLB、TKE、数据库、存储、CDN、消息队列等核心产品',
    weight: 55,
    wikiUrl: `${WIKI_BASE}/chapter2/2.1_%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8CVM%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/`,
    subChapters: [
      { id: 'ch2-cvm', name: 'CVM云服务器', wikiUrl: `${WIKI_BASE}/chapter2/2.1_%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8CVM%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-as', name: '弹性伸缩AS', wikiUrl: `${WIKI_BASE}/chapter2/2.2_%E5%BC%B9%E6%80%A7%E4%BC%B8%E7%BC%A9AS%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-tke', name: '容器服务TKE', wikiUrl: `${WIKI_BASE}/chapter2/2.3_%E5%AE%B9%E5%99%A8%E6%9C%8D%E5%8A%A1TKE%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-vpc', name: '私有网络VPC', wikiUrl: `${WIKI_BASE}/chapter2/2.4_%E7%A7%81%E6%9C%89%E7%BD%91%E7%BB%9CVPC%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-clb', name: '负载均衡CLB', wikiUrl: `${WIKI_BASE}/chapter2/2.5_%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1CLB%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-cdn', name: '内容分发CDN', wikiUrl: `${WIKI_BASE}/chapter2/2.6_%E5%86%85%E5%AE%B9%E5%88%86%E5%8F%91%E7%BD%91%E7%BB%9CCDN%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-storage', name: '云存储', wikiUrl: `${WIKI_BASE}/chapter2/2.7_%E4%BA%91%E5%AD%98%E5%82%A8%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-cls', name: '日志服务CLS', wikiUrl: `${WIKI_BASE}/chapter2/2.8_%E6%97%A5%E5%BF%97%E6%9C%8D%E5%8A%A1CLS%E4%BB%8B%E7%BB%8D/` },
      { id: 'ch2-cdb', name: '云数据库MySQL', wikiUrl: `${WIKI_BASE}/chapter2/2.9_%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-tdsql', name: '分布式数据库TDSQL', wikiUrl: `${WIKI_BASE}/chapter2/2.10_%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%88%86%E5%B8%83%E5%BC%8F%E6%95%B0%E6%8D%AE%E5%BA%93TDSQL/` },
      { id: 'ch2-tdsqlc', name: 'TDSQL-C与Redis', wikiUrl: `${WIKI_BASE}/chapter2/2.11_%E4%BA%91%E5%8E%9F%E7%94%9FTDSQL-C%2B%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93Redis/` },
      { id: 'ch2-redis', name: 'Redis最佳实践', wikiUrl: `${WIKI_BASE}/chapter2/2.12_%E4%BA%91Redis%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5%2B%E5%85%B6%E4%BB%96NoSQL/` },
      { id: 'ch2-mq', name: '消息队列', wikiUrl: `${WIKI_BASE}/chapter2/2.13_%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-micro', name: '微服务', wikiUrl: `${WIKI_BASE}/chapter2/2.14_%E5%BE%AE%E6%9C%8D%E5%8A%A1%E6%A6%82%E8%BF%B0%E5%8F%8A%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/` },
      { id: 'ch2-scf', name: 'Serverless云函数', wikiUrl: `${WIKI_BASE}/chapter2/2.15_Serverless%E4%BA%91%E5%87%BD%E6%95%B0SCF/` },
      { id: 'ch2-domain', name: '域名与SSL', wikiUrl: `${WIKI_BASE}/chapter2/2.16_%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%2B%E6%95%B0%E5%AD%97%E8%AF%81%E4%B9%A6%2BSSL/` },
      { id: 'ch2-tcop', name: '可观测平台TCOP', wikiUrl: `${WIKI_BASE}/chapter2/2.17_%E8%85%BE%E8%AE%AF%E4%BA%91%E5%8F%AF%E8%A7%82%E6%B5%8B%E5%B9%B3%E5%8F%B0/` },
    ],
  },
  {
    id: 3,
    name: '云架构设计实践',
    description: '容灾架构、性能优化、容器化改造、AI大模型',
    weight: 13.5,
    wikiUrl: `${WIKI_BASE}/chapter3/3.1_%E4%BA%91%E4%B8%8A%E5%AE%B9%E7%81%BE/`,
    subChapters: [
      { id: 'ch3-dr', name: '云上容灾', wikiUrl: `${WIKI_BASE}/chapter3/3.1_%E4%BA%91%E4%B8%8A%E5%AE%B9%E7%81%BE/` },
      { id: 'ch3-perf', name: '性能优化', wikiUrl: `${WIKI_BASE}/chapter3/3.2_%E4%BA%91%E4%B8%8A%E6%9E%B6%E6%9E%84%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/` },
      { id: 'ch3-container', name: '应用容器化改造', wikiUrl: `${WIKI_BASE}/chapter3/3.3_%E5%BA%94%E7%94%A8%E5%AE%B9%E5%99%A8%E5%8C%96%E6%94%B9%E9%80%A0/` },
      { id: 'ch3-ai', name: 'AI和大模型', wikiUrl: `${WIKI_BASE}/chapter3/3.4_AI%E5%92%8C%E5%A4%A7%E6%A8%A1%E5%9E%8B/` },
    ],
  },
  {
    id: 4,
    name: '云安全体系',
    description: '等保2.0、云安全标准、网络安全、计算安全',
    weight: 14.5,
    wikiUrl: `${WIKI_BASE}/chapter4/4.1_%E5%9B%BD%E5%AE%B6%E5%AE%89%E5%85%A8%E7%AD%89%E7%BA%A7%E4%BF%9D%E6%8A%A4/`,
    subChapters: [
      { id: 'ch4-mlps', name: '国家等级保护', wikiUrl: `${WIKI_BASE}/chapter4/4.1_%E5%9B%BD%E5%AE%B6%E5%AE%89%E5%85%A8%E7%AD%89%E7%BA%A7%E4%BF%9D%E6%8A%A4/` },
      { id: 'ch4-standard', name: '云安全体系标准', wikiUrl: `${WIKI_BASE}/chapter4/4.2_%E4%BA%91%E5%AE%89%E5%85%A8%E4%BD%93%E7%B3%BB%E4%B8%8E%E6%A0%87%E5%87%86/` },
      { id: 'ch4-network', name: '安全通信与边界', wikiUrl: `${WIKI_BASE}/chapter4/4.3_%E6%9E%84%E5%BB%BA%E5%AE%89%E5%85%A8%E9%80%9A%E4%BF%A1%E7%BD%91%E7%BB%9C%E5%8F%8A%E5%AE%89%E5%85%A8%E5%8C%BA%E5%9F%9F%E8%BE%B9%E7%95%8C/` },
      { id: 'ch4-compute', name: '安全计算与管理', wikiUrl: `${WIKI_BASE}/chapter4/4.4_%E6%9E%84%E5%BB%BA%E5%AE%89%E5%85%A8%E8%AE%A1%E7%AE%97%E7%8E%AF%E5%A2%83%E5%8F%8A%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/` },
    ],
  },
  {
    id: 5,
    name: '云迁移与成本管理',
    description: '迁移方法论、迁移工具、成本优化FinOps',
    weight: 12.5,
    wikiUrl: `${WIKI_BASE}/chapter5/5.1_%E8%BF%81%E7%A7%BB%E6%96%B9%E6%B3%95%E8%AE%BA%E6%A6%82%E8%BF%B0/`,
    subChapters: [
      { id: 'ch5-method', name: '迁移方法论', wikiUrl: `${WIKI_BASE}/chapter5/5.1_%E8%BF%81%E7%A7%BB%E6%96%B9%E6%B3%95%E8%AE%BA%E6%A6%82%E8%BF%B0/` },
      { id: 'ch5-tools', name: '迁移工具', wikiUrl: `${WIKI_BASE}/chapter5/5.2_%E4%BA%91%E7%BB%84%E4%BB%B6%E4%B8%8E%E8%BF%81%E7%A7%BB%E5%B7%A5%E5%85%B7/` },
      { id: 'ch5-cost', name: '成本管理与案例', wikiUrl: `${WIKI_BASE}/chapter5/5.3_%E8%BF%81%E7%A7%BB%E6%A1%88%E4%BE%8B%E4%BB%8B%E7%BB%8D%E5%8F%8A%E4%BA%91%E4%B8%8A%E8%B5%84%E6%BA%90%E6%88%90%E6%9C%AC%E7%AE%A1%E7%90%86/` },
    ],
  },
];

export default chapters;
