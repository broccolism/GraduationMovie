# GraduationMovie

졸업을 해 보자.

## Server

- 상세 페이지: https://www.notion.so/API-4f99a4f4ca51425799988bf50222063b

도메인별로 API를 나누면 다음과 같습니다.

| 도메인 | 이름                                                                                                 | 기능                                                            |
| :----: | :--------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
|  User  | getIdByNickname                                                                                      | 유저 닉네임으로 아이디를 돌려줍니다.                            |
|        | createUser                                                                                           | 새 유저를 데이터베이스에 등록합니다.                            |
|        | getUserInfo                                                                                          | 현재 유저의 정보 (e.g: 시청한 영화 목록)를 돌려줍니다.          |
|        | [getSimilarUser](https://github.com/GraduationMovie/GraduationMovie#파일-데이터를-사용하는-api)      | 현재 유저와 가장 비슷한 양상을 보이는 유저 아이디를 돌려줍니다. |
|        | getRewatchingMovie                                                                                   | 그동안 시청한 영화 중 다시보기 추천 영화를 찾아줍니다.          |
|        | searchMovieWatched                                                                                   | 그동안 시청한 영화에서 검색한 결과를 돌려줍니다.                |
|        | watchMovie                                                                                           | 영화를 봤다는 기록을 남깁니다.                                  |
| Movie  | [getDissimilarMovies](https://github.com/GraduationMovie/GraduationMovie#파일-데이터를-사용하는-api) | 최대한 서로 비슷하지 않은 영화 목록을 돌려줍니다.               |
|        | [getTopNMoviesById](https://github.com/GraduationMovie/GraduationMovie#파일-데이터를-사용하는-api)   | 특정 유저에게 추천되는 top N 영화 목록을 돌려줍니다.            |
|        | getTopNMoviesForEvery                                                                                | general하게 인기 많은 top N 영화 목록을 돌려줍니다.             |
|        | rateOneMovie                                                                                         | 데이터베이스에 새 평점을 등록합니다.                            |
|        | getMoviePosterAndTitleById                                                                           | 영화에 대한 포스터 url과 제목을 돌려줍니다.                     |
|        | getMovieImageAndTitleById                                                                            | 영화와 관련된 가로 이미지 url과 제목을 돌려줍니다.              |
|        | getMoviewDetailById                                                                                  | 영화 상세 정보 (e.g: 출연진)를 돌려줍니다.                      |
|        | searchMovie                                                                                          | 제목, 출연진, 키워드 등을 기준으로 검색한 결과를 돌려줍니다.    |
|        | searchMovieByKeyword                                                                                 | 키워드와 연관된 영화 목록을 돌려줍니다.                         |

### 파일 데이터를 사용하는 API

모든 파일 데이터는 `GraduationMovie/server/src/data` 폴더에 `JSON` 파일로 주어집니다.

| 이름                | 필요한 파일명     |
| :------------------ | :---------------- |
| getSimilarUser      | user-sim.json     |
| getTopNMoviesById   | neu-mf.json       |
| getDissimilarMovies | movie-dissim.json |

#### 파일별 형식

user-sim.json

```
{
  "유저 아이디" : [비슷한 유저 아이디 리스트 (sorted by similarity)],
  "유저 아이디" : [비슷한 유저 아이디 리스트 (sorted by similarity)],
  ...
  "유저 아이디" : [비슷한 유저 아이디 리스트 (sorted by similarity)]
}
```

neu-mf.json

```
{
  "유저 아이디" : [영화 아이디 리스트 (sorted by predicted rating)],
  "유저 아이디" : [영화 아이디 리스트 (sorted by predicted rating)],
  ...
  "유저 아이디" : [영화 아이디 리스트 (sorted by predicted rating)]
}
```

movie-dissim.json

```
[영화 아이디 리스트 (sorted by dissimilarity)]
```

### 외부 API

#### [OMDB api](https://www.omdbapi.com/)

- Detail API: 영화 1편에 대한 정보를 불러오기 위해 사용했습니다.
  <details>
  <summary>예시 response</summary>

  ```
  {
    "Genre": "Drama, Music",
    "Director": "Bertrand Tavernier",
    "Writer": "David Rayfiel (screenplay), Bertrand Tavernier (screenplay), Colo Tavernier (French translation)",
    "Actors": "Dexter Gordon, François Cluzet, Gabrielle Haker, Sandra Reaves-Phillips",
    "Plot": "A troubled, but talented musician flees the US to escape his problems, finding refuge and support in Paris.",
    "Awards": "Won 1 Oscar. Another 10 wins & 12 nominations.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzBlNThhNTctYmE4YS00YzM5LWEwZTAtODlkN2IyNWYwOWM4XkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg",
    "Production": "Little Bear [fr]",
  }
  ```

  </details>

#### [TMDB api](https://developers.themoviedb.org/3/getting-started/introduction)

- Movie Search API: 키워드별 영화 찾기 등 검색 스크린 제작을 위해 사용했습니다.
  <details>
  <summary>예시 response</summary>

  ```
  {
    "page": 1, // 현재 페이지
    "results": [ // 20개씩
      {
        "adult": false,
        "backdrop_path": "/h8C7KZwCJO5DN7jPifc7AoIjx7k.jpg",
        "genre_ids": [
          16,
          35,
          10751,
          12
        ],
        "id": 14160,
        "original_language": "en",
        "original_title": "Up",
        "overview": "Carl Fredricksen spent his entire life dreaming of exploring the globe and experiencing life to its fullest. But at age 78, life seems to have passed him by, until a twist of fate (and a persistent 8-year old Wilderness Explorer named Russell) gives him a new lease on life.",
        "popularity": 85.195,
        "poster_path": "/eAdO0qa9m0NFSVLZ26PvCwmPlsr.jpg",
        "release_date": "2009-05-28",
        "title": "Up",
        "video": false,
        "vote_average": 7.9,
        "vote_count": 15965
      }, ...
    ],
    "total_pages": 187,
    "total_results": 3736
  }
  ```

  </details>

- People Search API: 영화에 출연한 배우의 프로필 사진을 위해 사용했습니다.
  <details>
  <summary>예시 response</summary>

  ```
  {
    "page": 1,
    "results": [
      "adult": false,
      "gender": 0,
      "id": 77135,
      "known_for": [],
      "known_for_department": "Acting",
      "name": "Dexter Gordon",
      "popularity": 0.982,
      "profile_path": "/uXZ3KegarfYWQ7ANQq7hFKbXpg2.jpg"
    ],
    "total_pages": 1,
    "total_results": 2
  }
  ```

  </details>

- Detail API: 영화 1편에 대한 추가 정보를 불러오기 위해 사용했습니다.

  <details>
  <summary>예시 response</summary>

  ```
  {
    "backdrop_path": "/u546kDNwrZ1ii6q8NqqQgHwRvoW.jpg",
    "overview": "A rich woman and a calculating insurance agent plot to kill her unsuspecting husband after he signs a double indemnity policy. Against a backdrop of distinctly Californian settings, the partners in crime plan the perfect murder to collect the insurance, which pays double if the death is accidental.",
    "poster_path": "/3FxPFG4IEg1kX00oAJn7L06GoCS.jpg",
    "tagline": "From the moment they met it was murder!",
    "title": "Double Indemnity",
    "vote_average": 8.2,
    "vote_count": 1177
  }
  ```

  </summary>

- Image API: 포스터, 트레일러 등 영화와 관련된 이미지 가져오기 위해 사용했습니다.
  <details>
  <summary>예시 response</summary>

  ```
  {
    "backdrops": [
      {
        "aspect_ratio": 1.778,
        "height": 1152,
        "iso_639_1": null,
        "file_path": "/miOnymJ0dN2psWBB8Vleo3fUyrc.jpg",
        "vote_average": 5.456,
        "vote_count": 7,
        "width": 2048
      }, ...
    ],
    "id": 607259,
    "posters": [
      {
        "aspect_ratio": 0.667,
        "height": 750,
        "iso_639_1": "en",
        "file_path": "/pR2fzm82fl0giommpo310LBOMbV.jpg",
        "vote_average": 5.522,
        "vote_count": 4,
        "width": 500
      }, ...
    ]
  }
  ```

  </details>

- Video API: 영화 1개에 대한 유투브 비디오 링크를 불러오기 위해 사용했습니다.
  <details>
  <summary>예시 response</summary>

  ```
  // 찾았을 때
  {
    "id": 607259,
    "results": [
      {
        "id": "6099d075efd3c2003c96ff81",
        "iso_639_1": "en",
        "iso_3166_1": "US",
        "key": "T3mwUEoZdrI",
        "name": "Official Trailer",
        "site": "YouTube",
        "size": 1080,
        "type": "Trailer"
      }
    ]
  }

  // 못 찾았을 때 & 잘못된 요청일 때
  {
    "success": false,
    "status_code": 34,
    "status_message": "The resource you requested could not be found."
  }
  ```

  </details>

- TopRated API: 현재 TMDB에 있는 영화 중 general하게 가장 인기 있는 영화를 보여줍니다.

  <details>
  <summary>예시 response</summary>

  ```
  {
    "page": 1,
    "results": [
      {
        "adult": false,
        "backdrop_path": "/gNBCvtYyGPbjPCT1k3MvJuNuXR6.jpg",
        "genre_ids": [
          35,
          18,
          10749
        ],
        "id": 19404,
        "original_language": "hi",
        "original_title": "दिलवाले दुल्हनिया ले जायेंगे",
        "overview": "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
        "popularity": 16.317,
        "poster_path": "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
        "release_date": "1995-10-20",
        "title": "Dilwale Dulhania Le Jayenge",
        "video": false,
        "vote_average": 8.7,
        "vote_count": 3007
      },
    ], // 20개씩
    "total_pages": 444,
    "total_results": 8879
  }
  ```

  </details>

- Keyword API: 다음과 두가지 기능을 위해 사용했습니다.
  1. 키워드 아이디로 관련된 영화 찾기
  2. 영화 아이디로 관련된 키워드 찾기

## Recommender

NeuMF 라이브러리를 사용했습니다. [임시 브랜치를 만들었습니다.](https://github.com/GraduationMovie/NeuRecRecommender/tree/NeuMF)
다음과 같은 과정을 거칩니다.

#### 0. 실행환경

- 아나콘다 가상환경: python 3.6.1

#### 1. input 파일 형식 converting

- "유저가 특정 시각에 영화에 매긴 N점" 이라는 정보를 "유저가 특정 시각에 영화에 평점을 매김" 이라는 정보로 바꿉니다.

  - NeuMF가 OCCF의 일종이기 때문입니다.

- GraduationNeuRec/dataset 폴더에 ml-latest.rating 파일이 있어야 합니다.

```
// 실행이 완료되면 ml-latest-binary.rating 파일이 생성됩니다.
python3 GraduationNeuRec/dataset/input_converter.py
```

#### 2. NeuMF 실행

- 실행 결과로 모든 user-movie에 대한 예상 평점을 담은 매트릭스가 나옵니다.

- GraduationNeuRec/dataset 폴더에 ml-latest-binary.rating 파일이 있어야 합니다.

```
python3 GraduationNeuRec/setup.py build_ext --inplace
python3 GraduationNeuRec/main.py
```

#### 3. output 파일 형식 converting

- NeuMF 라이브러리에서는 자체적으로 user, item에 대한 아이디를 부여합니다. 즉, input파일과 output 파일에서 같은 아이디 '1'이 의미하는 대상이 달라집니다.
- 따라서 파일 converting 시 기존 데이터셋의 아이디와 NeuMF에서 사용한 아이디 간 맵핑을 진행합니다.

- GraduationNeuRect/dataset 폴더에 \_tmp-ml-latest-binary 폴더와 그 아래에 파일이 있어야 합니다.

```
// python3 GraduationNeuRect/dataset/output_converter.py {output 폳더명} {타겟 파일명}
python3 GraduationNeuRec/dataset/output_converter.py _tmp_ml-latest-binary 2021-08-09_19:04:09.raw
```

- 최종 output 파일은 JSON 파일입니다. 서버 API에서는 아래와 같은 형식의 파일로부터 데이터를 가져옵니다.

```
{
  "유저아이디": [추천 영화 아이디 목록]
}

// top 21 movies를 요청했을 때
{
  "1": [
    2571, 296, 356, 4993, 1210, 260, 589, 1, 1270, 858, 318, 2858, 2959, 593,
    7153, 648, 47, 780, 480, 1136, 4306
  ],
  "2": [
    2571, 318, 296, 356, 4993, 1210, 260, 589, 1196, 1, 1270, 858, 2858, 2959,
    608, 7153, 593, 648, 47, 780, 1136
  ], ...
}
```
