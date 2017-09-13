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
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=all > "$DATA_DIR/BTC-USD_all.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=year > "$DATA_DIR/BTC-USD_year.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=month > "$DATA_DIR/BTC-USD_month.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=week > "$DATA_DIR/BTC-USD_week.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=day > "$DATA_DIR/BTC-USD_day.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=hour > "$DATA_DIR/BTC-USD_hour.json"

# Ethereum (ETH)
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=all > "$DATA_DIR/ETH-USD_all.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=year > "$DATA_DIR/ETH-USD_year.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=month > "$DATA_DIR/ETH-USD_month.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=week > "$DATA_DIR/ETH-USD_week.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=day > "$DATA_DIR/ETH-USD_day.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=hour > "$DATA_DIR/ETH-USD_hour.json"

# Litecoin (LTC)
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=all > "$DATA_DIR/LTC-USD_all.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=year > "$DATA_DIR/LTC-USD_year.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=month > "$DATA_DIR/LTC-USD_month.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=week > "$DATA_DIR/LTC-USD_week.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=day > "$DATA_DIR/LTC-USD_day.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=hour > "$DATA_DIR/LTC-USD_hour.json"

# Spot Prices (BTC, ETH, LTC)
curl https://www.coinbase.com/api/v2/prices/USD/spot? > "$DATA_DIR/USD_spot.json"