SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_event_log` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `event_type` varchar(32) NOT NULL COMMENT 'expose/click/cart/order/pay/collect',
  `scene` varchar(64) NOT NULL DEFAULT 'home_hot',
  `event_time` datetime NOT NULL,
  `ext_json` text NULL,
  PRIMARY KEY (`event_id`),
  KEY `idx_reco_event_openid_time` (`openid`, `event_time`),
  KEY `idx_reco_event_goods_time` (`goods_id`, `event_time`),
  KEY `idx_reco_event_type_time` (`event_type`, `event_time`),
  KEY `idx_reco_event_scene_time` (`scene`, `event_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_engine_config` (
  `config_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `scene` varchar(64) NOT NULL,
  `enabled` varchar(2) NOT NULL DEFAULT '1',
  `cf_weight` decimal(6,4) NOT NULL DEFAULT 0.3300,
  `ctr_weight` decimal(6,4) NOT NULL DEFAULT 0.3300,
  `cvr_weight` decimal(6,4) NOT NULL DEFAULT 0.3400,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`config_id`),
  UNIQUE KEY `uk_reco_engine_scene` (`scene`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_rule` (
  `rule_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rule_name` varchar(128) NOT NULL,
  `scene` varchar(64) NOT NULL DEFAULT 'home_hot',
  `enabled` varchar(2) NOT NULL DEFAULT '1',
  `priority` int(11) NOT NULL DEFAULT 0,
  `min_usage_days` int(11) NULL,
  `min_order_count_30d` int(11) NULL,
  `min_consume_amount_30d` decimal(12,2) NULL,
  `high_value_only` varchar(2) NOT NULL DEFAULT '0',
  `cf_weight` decimal(6,4) NOT NULL DEFAULT 0.3300,
  `ctr_weight` decimal(6,4) NOT NULL DEFAULT 0.3300,
  `cvr_weight` decimal(6,4) NOT NULL DEFAULT 0.3400,
  `remark` varchar(255) NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`rule_id`),
  KEY `idx_reco_rule_scene_enabled_priority` (`scene`, `enabled`, `priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_user_profile_daily` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `dt` date NOT NULL,
  `usage_duration_days` int(11) NULL DEFAULT 0,
  `consumed_order_count_30d` int(11) NULL DEFAULT 0,
  `consumed_amount_30d` decimal(12,2) NULL DEFAULT 0.00,
  `avg_order_amount_30d` decimal(12,2) NULL DEFAULT 0.00,
  `is_high_value_user` varchar(2) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_reco_profile_openid_dt` (`openid`, `dt`),
  KEY `idx_reco_profile_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_job` (
  `job_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_type` varchar(32) NOT NULL COMMENT 'train/score',
  `algo_type` varchar(16) NOT NULL COMMENT 'CF/CTR/CVR/BLEND',
  `status` varchar(16) NOT NULL COMMENT 'PENDING/RUNNING/SUCCESS/FAILED',
  `sample_size` bigint(20) NULL,
  `auc` decimal(10,6) NULL,
  `logloss` decimal(10,6) NULL,
  `recall_at_k` decimal(10,6) NULL,
  `model_version` varchar(64) NULL,
  `log_path` varchar(255) NULL,
  `message` varchar(255) NULL,
  `start_time` datetime NULL,
  `end_time` datetime NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`job_id`),
  KEY `idx_reco_job_status_create` (`status`, `create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `algo_type` varchar(16) NOT NULL COMMENT 'CF/CTR/CVR',
  `score` decimal(14,8) NOT NULL,
  `rank_no` int(11) NOT NULL,
  `biz_scene` varchar(64) NOT NULL DEFAULT 'home_hot',
  `model_version` varchar(64) NULL,
  `dt` datetime NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_reco_result` (`openid`, `goods_id`, `algo_type`, `biz_scene`, `dt`),
  KEY `idx_reco_result_query` (`openid`, `biz_scene`, `algo_type`, `dt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_blend_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `score` decimal(14,8) NOT NULL,
  `rank_no` int(11) NOT NULL,
  `biz_scene` varchar(64) NOT NULL DEFAULT 'home_hot',
  `model_version` varchar(64) NULL,
  `dt` datetime NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_reco_blend` (`openid`, `goods_id`, `biz_scene`, `dt`),
  KEY `idx_reco_blend_query` (`openid`, `biz_scene`, `dt`, `rank_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_rule_hit_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `rule_id` bigint(20) NULL,
  `scene` varchar(64) NOT NULL,
  `cf_weight` decimal(6,4) NOT NULL,
  `ctr_weight` decimal(6,4) NOT NULL,
  `cvr_weight` decimal(6,4) NOT NULL,
  `request_time` datetime NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_reco_hit_openid_time` (`openid`, `request_time`),
  KEY `idx_reco_hit_rule` (`rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reco_train_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `scene` varchar(64) NOT NULL,
  `enabled` varchar(2) NOT NULL DEFAULT '1',
  `train_frequency` varchar(32) NOT NULL DEFAULT 'DAILY',
  `attr_weight` decimal(6,4) NOT NULL DEFAULT 0.2000,
  `consume_weight` decimal(6,4) NOT NULL DEFAULT 0.3000,
  `rating_weight` decimal(6,4) NOT NULL DEFAULT 0.3000,
  `dish_weight` decimal(6,4) NOT NULL DEFAULT 0.2000,
  `cron_expr` varchar(64) NULL,
  `next_run_time` datetime NULL,
  `remark` varchar(255) NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_reco_train_scene` (`scene`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
