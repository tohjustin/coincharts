#/usr/bin/env bash
# Fetch price data from Coinbase's API
# Save the results as .json files into a directory provided in the first argument ($1)
DATA_DIR=${1-"./public/priceData"}

# Check if argument provided is a valid directory
if [ ! -d "$DATA_DIR" ]; then
  echo 'Error: You have provided an invalid directory!'
  exit
fi

# Create directory if it doesn't exist
if [ ! -d $DATA_DIR ]; then
  mkdir -p $DATA_DIR;
fi

# Bitcoin (BTC)
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=all > "$DATA_DIR/btc_usd_all.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=year > "$DATA_DIR/btc_usd_year.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=month > "$DATA_DIR/btc_usd_month.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=week > "$DATA_DIR/btc_usd_week.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=day > "$DATA_DIR/btc_usd_day.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=hour > "$DATA_DIR/btc_usd_hour.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/spot? > "$DATA_DIR/btc_usd_spot.json"

# Ethereum (ETH)
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=all > "$DATA_DIR/eth_usd_all.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=year > "$DATA_DIR/eth_usd_year.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=month > "$DATA_DIR/eth_usd_month.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=week > "$DATA_DIR/eth_usd_week.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=day > "$DATA_DIR/eth_usd_day.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=hour > "$DATA_DIR/eth_usd_hour.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/spot? > "$DATA_DIR/eth_usd_spot.json"

# Litecoin (LTC)
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=all > "$DATA_DIR/ltc_usd_all.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=year > "$DATA_DIR/ltc_usd_year.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=month > "$DATA_DIR/ltc_usd_month.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=week > "$DATA_DIR/ltc_usd_week.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=day > "$DATA_DIR/ltc_usd_day.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=hour > "$DATA_DIR/ltc_usd_hour.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/spot? > "$DATA_DIR/ltc_usd_spot.json"