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
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=all > "$DATA_DIR/BTC-USD-all.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=year > "$DATA_DIR/BTC-USD-year.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=month > "$DATA_DIR/BTC-USD-month.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=week > "$DATA_DIR/BTC-USD-week.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=day > "$DATA_DIR/BTC-USD-day.json"
curl https://www.coinbase.com/api/v2/prices/BTC-USD/historic\?period\=hour > "$DATA_DIR/BTC-USD-hour.json"

# Bitcoin Cash (BCH)
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=all > "$DATA_DIR/BCH-USD-all.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=year > "$DATA_DIR/BCH-USD-year.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=month > "$DATA_DIR/BCH-USD-month.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=week > "$DATA_DIR/BCH-USD-week.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=day > "$DATA_DIR/BCH-USD-day.json"
curl https://www.coinbase.com/api/v2/prices/BCH-USD/historic\?period\=hour > "$DATA_DIR/BCH-USD-hour.json"

# Ethereum (ETH)
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=all > "$DATA_DIR/ETH-USD-all.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=year > "$DATA_DIR/ETH-USD-year.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=month > "$DATA_DIR/ETH-USD-month.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=week > "$DATA_DIR/ETH-USD-week.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=day > "$DATA_DIR/ETH-USD-day.json"
curl https://www.coinbase.com/api/v2/prices/ETH-USD/historic\?period\=hour > "$DATA_DIR/ETH-USD-hour.json"

# Litecoin (LTC)
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=all > "$DATA_DIR/LTC-USD-all.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=year > "$DATA_DIR/LTC-USD-year.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=month > "$DATA_DIR/LTC-USD-month.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=week > "$DATA_DIR/LTC-USD-week.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=day > "$DATA_DIR/LTC-USD-day.json"
curl https://www.coinbase.com/api/v2/prices/LTC-USD/historic\?period\=hour > "$DATA_DIR/LTC-USD-hour.json"

# Spot Prices (BTC, BCH, ETH, LTC)
curl https://www.coinbase.com/api/v2/prices/USD/spot? > "$DATA_DIR/USD-spot.json"
