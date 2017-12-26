#/usr/bin/env bash
# Fetch price data from Coinbase's API
# Save the results as .json files into a directory provided in the first argument ($1)
DATA_DIR=${1-"./public/priceData"}

# Create directory if it doesn't exist
if [ ! -d $DATA_DIR ]; then
  mkdir -p $DATA_DIR;
fi

# Check if argument provided is a valid directory
if [ ! -d "$DATA_DIR" ]; then
  echo 'Error: You have provided an invalid directory!'
  exit
fi

# Bitcoin (BTC)
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=all > "$DATA_DIR/btc-usd_all.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=year > "$DATA_DIR/btc-usd_year.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=month > "$DATA_DIR/btc-usd_month.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=week > "$DATA_DIR/btc-usd_week.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=day > "$DATA_DIR/btc-usd_day.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=hour > "$DATA_DIR/btc-usd_hour.json"

# Bitcoin Cash (BCH)
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=all > "$DATA_DIR/bch-usd_all.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=year > "$DATA_DIR/bch-usd_year.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=month > "$DATA_DIR/bch-usd_month.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=week > "$DATA_DIR/bch-usd_week.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=day > "$DATA_DIR/bch-usd_day.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=hour > "$DATA_DIR/bch-usd_hour.json"

# Ethereum (ETH)
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=all > "$DATA_DIR/eth-usd_all.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=year > "$DATA_DIR/eth-usd_year.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=month > "$DATA_DIR/eth-usd_month.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=week > "$DATA_DIR/eth-usd_week.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=day > "$DATA_DIR/eth-usd_day.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=hour > "$DATA_DIR/eth-usd_hour.json"

# Litecoin (LTC)
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=all > "$DATA_DIR/ltc-usd_all.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=year > "$DATA_DIR/ltc-usd_year.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=month > "$DATA_DIR/ltc-usd_month.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=week > "$DATA_DIR/ltc-usd_week.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=day > "$DATA_DIR/ltc-usd_day.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=hour > "$DATA_DIR/ltc-usd_hour.json"

# Spot Prices (BTC, BCH, ETH, LTC)
curl https://www.coinbase.com/api/v2/prices/USD/spot? > "$DATA_DIR/usd_spot.json"
