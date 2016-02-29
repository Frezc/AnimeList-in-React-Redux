//Watching Status
export const NOT_WATCHING = 'not_watching';
export const WATCHING = 'watching';
export const ABANDON = 'abandon';
export const ALL = 'all';

export const StatusText = {
	[NOT_WATCHING]: {
		'en': 'not watching',
		'cn': '未看',
		'ja': '見てない'
	},
	[WATCHING]: {
		'en': 'watching',
		'cn': '在看',
		'ja': '見てる'
	},
	[ABANDON]: {
		'en': 'abandon',
		'cn': '抛弃',
		'ja': '捨てる'
	},
	[ALL]: {
		'en': 'all',
		'cn': '全部',
		'ja': '全部'
	}
};
