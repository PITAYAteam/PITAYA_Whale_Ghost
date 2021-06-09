#ifndef random_h
#define random_h
#endif

void rnd()
{
    for (int j = 0; j <= PWM_CHANNELS; j++)
    {
        ref[j] = {PWM_CHANNELS};
    }
    int i = 0;

    boolean equals;

    while (i != PWM_CHANNELS) 
    {
        ref[i] = random(PWM_CHANNELS);

#ifdef DEBUG
        Serial.print("ref[");
        Serial.print(i);
        Serial.print("] = ");
        Serial.println(ref[i]);
#endif

        equals = false;
        for (int k = 0; k != i; k++)
        {
#ifdef DEBUG
            Serial.print("k ref[");
            Serial.print(k);
            Serial.print("] = ");
            Serial.print(ref[k]);
            Serial.print("  iref[");
            Serial.print(i);
            Serial.print("] = ");
            Serial.println(ref[i]);
#endif
            if (ref[k] == ref[i])
            {
                equals = true;
            }
        }
        if (!equals)
        {
            i++;
        }
    }
}