# SpongeBob Timer

> Are you still watching the SpongeBob timer?  
> Hurry up and get moving, you lazy barnacle!  

---

## Usage

### URL

```http://localhost/aaa?show=h,m,s&voice=on```

### Download Iamge

aa > bb > cc

## Options

```http://localhost/aaa?show={show}&voice={voice}&bg={bg}&time={time}```

| Option | Type                            | Default      | Description                                        |
| ------ | ------------------------------- | ------------ | -------------------------------------------------- |
| format | Y \\| M \\| D \\| h \\| m \\| s | h            | show date format, multiple select                  |
| voice  | Boolean                         | true         | play narration                                     |
| bg     | Number                          | 60           | change background duration (0: off, 1~: interval)  |
| time   | Date                            | random Date  | target time date (dateformat: YYYYMMDDhhmmss)      |
| count  | Number                          | 0            | countdown to target date (0: off, 1~: interval)    |
