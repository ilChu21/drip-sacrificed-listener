export const DRIP_ADDRESS = '0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333';

export const DRIP_ABI = [
  // Constant functions (pure or view)
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint)',
  'function players() view returns (uint256)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

// VAULT, GARDEN, DRIP_BUSD, LIBERATION, MINTER
export const addresses = [
  '0xBFF8a1F9B5165B787a00659216D7313354D25472',
  '0x685BFDd3C2937744c13d7De0821c83191E3027FF',
  '0xa0feB3c81A36E885B6608DF7f0ff69dB97491b58',
  '0x1C3dED13e70d90fc6f50B48889e03E0972BA0a97',
  '0x0000000000000000000000000000000000000000',
];
