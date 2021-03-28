# file to store comparison algorithms

def compare(person1, person2):
    """
    wrapper function that contains the overall comparison algorithm
    inputs:
    - person1, in some fashion
    - person2, in some fashion
    """

def calc_ranked_shared_songs(person1_songs, person2_songs):
    """
    calculates the sum of shared_songs and ranked_song_score
    """
    score = shared_songs(person1_songs, person2_songs)

    if score != 0:
        d1 = rank_dict(person1_songs)
        d2 = rank_dict(person2_songs)
        score += ranked_song_score(person1_songs, person2_songs, d1, d2)
    
    return score

def shared_songs(person1_songs, person2_songs):
    """
    returns number of shared songs
    inputs:
    - person1_songs: list of person1's top songs
    - person2_songs: list of person2's top songs
    """
    person1_set = set(person1_songs)
    person2_set = set(person2_songs)
    return -1 * (len(person1_set | person2_set) - len(person1_set) - len(person2_set))

def ranked_song_score(person1_songs, person2_songs, person1_ranked_dict, person2_ranked_dict):
    """
    function to create a song rank comparison score
    """
    pperson1_set = set(person1_songs)
    person2_set = set(person2_songs)
    score = 0
    set_len = len(person1_set)

    for song in person1_set.intersection(person2_set):
        score += 1 - abs(person1_ranked_dict[song] - person2_ranked_dict)/set_len
        # add 1 - 0.01 * the differential in rank for each shared song
    
    return score

def rank_dict(person_songs):
    """
    converts a song list into a ranked song dictionary, with keys = title
    ranks start at 1!
    """
    ranked_dict = {}
    for i in range(len(person_songs)):
        ranked_dict[person_songs[i]] = i + 1
    return ranked_dict